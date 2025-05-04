/** npm imports */
import { Sequelize } from 'sequelize'

/** local imports */
import settings from '../config/settings'

export const dbInstance = (): Sequelize => {
  const { DBHost, DBPort, DBUser, DBPassword, DBName } = settings.DBSettings
  if (!DBHost || !DBPort || !DBUser || !DBPassword || !DBName) throw new Error('Missing database connection settings')

  try {
    const sequelize = new Sequelize(DBName, DBUser, DBPassword, {
      host: DBHost,
      port: DBPort,
      dialect: 'postgres',
      dialectOptions: {
        ssl: false,
      },
      logging: console.log,
      retry: {
        max: 5,
        timeout: 5000,
      },
    })

    console.log('Database connection established successfully')
    return sequelize
  } catch (error: any) {
    console.error('Error connecting to the database:', error.message)
    throw new Error('Database connection failed')
  }
}
