/** npm imports */
import { Sequelize } from 'sequelize-typescript'

/** local imports */
import settings from '../config/settings'
import { Character as CharacterModel } from './models/character.model'

// This is the db connection file for the backend app.
export const dbInstance = (): Sequelize => {
  const { env, DBSettings } = settings
  const { DBHost, DBPort, DBUser, DBPassword, DBName, DBNameTest } = DBSettings
  if (!DBHost || !DBPort || !DBUser || !DBPassword || !DBName || !DBNameTest)
    throw new Error('Missing database connection settings')

  try {
    const sequelize = new Sequelize({
      database: env === 'test' ? DBNameTest : DBName,
      username: DBUser,
      password: DBPassword,
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
      models: [CharacterModel],
    })

    console.log('Database connection established successfully')
    return sequelize
  } catch (error: any) {
    console.error('Error connecting to the database:', error.message)
    throw new Error('Database connection failed')
  }
}
