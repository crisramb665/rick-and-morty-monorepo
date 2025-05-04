/** npm imports */
import axios from 'axios'

/** local imports */
import settings from '../config/settings'
import { dbInstance } from '../data/db'
import { Character as CharacterModel } from '../data/models/character.model'

// Script used for seed the initial characters on db (15 characters)
const seedCharacters = async (): Promise<void> => {
  try {
    const sequelize = dbInstance()
    await sequelize.authenticate()
    console.log('DB initialized for seeding characters...')

    await sequelize.sync({ force: true })
    console.log('DB synced')

    const response = await axios.get(settings.RickAndMortyAPIUrl)
    const characters = response.data.results.slice(0, 15)

    const formattedCharacters = characters.map((c: any) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      species: c.species,
      type: c.type,
      gender: c.gender,
      origin: c.origin.name,
      location: c.location.name,
      image: c.image,
      episode: c.episode,
      url: c.url,
      created: c.created,
    }))

    await CharacterModel.bulkCreate(formattedCharacters)
    console.log('initial characters added')
  } catch (error: any) {
    console.error('Error seeding characters on db: ', error)
  }
}

seedCharacters()
