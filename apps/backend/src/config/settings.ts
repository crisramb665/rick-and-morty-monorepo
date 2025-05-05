/** npm imports */
import dotenv from 'dotenv'

dotenv.config()

type DBSettingsType = {
  DBHost: string
  DBPort: number
  DBUser: string
  DBPassword: string
  DBName: string
}

type SettingsType = {
  Port: number
  RickAndMortyAPIUrl: string
  DBSettings: DBSettingsType
}

// This is the settings file for the backend application.
// It loads environment variables from a .env file and exports them as a settings object.
const settings: SettingsType = {
  Port: Number(process.env.PORT) || 4000,
  RickAndMortyAPIUrl: process.env.RAM_API_URL || 'https://rickandmortyapi.com/api/character',
  DBSettings: {
    DBHost: process.env.DB_HOST || 'localhost',
    DBPort: Number(process.env.DB_PORT) || 5432,
    DBUser: process.env.DB_USER || 'rick',
    DBPassword: process.env.DB_PASSWORD || '',
    DBName: process.env.DB_NAME || 'rick_and_morty',
  },
}

export default settings
