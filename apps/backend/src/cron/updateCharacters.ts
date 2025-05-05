/** npm imports */
import axios from 'axios'

/** local imports */
import settings from '../config/settings'
import { dbInstance } from '../data/db'
import { Character } from '../data/models/character.model'
import redis from '../config/redis'

// this is possible since the API has already implemented a pagination
const fetchAllCharactersFromAPI = async () => {
  let characters: any[] = []
  let nextUrl = settings.RickAndMortyAPIUrl

  while (nextUrl) {
    const response = await axios.get(nextUrl)
    const data = response.data
    characters = characters.concat(data.results)
    nextUrl = data.info.next
  }

  return characters
}

const transformCharacter = (character: any) => ({
  ...character,
  origin: character.origin.name,
  location: character.location.name,
})

const hasChanged = (existing: Character, incoming: any): boolean => {
  return (
    existing.name !== incoming.name ||
    existing.status !== incoming.status ||
    existing.species !== incoming.species ||
    existing.gender !== incoming.gender ||
    existing.origin !== incoming.origin.name
  )
}

// This approach is possible since there are not too much entries on original DB to overcharge the query
export const updateCharacters = async () => {
  console.log('🔄️ Initializing update for existing characters on db...')

  try {
    const sequelize = dbInstance()
    await sequelize.authenticate()
    console.log('DB initialized for updating characters...')

    await sequelize.sync()

    const [existingCharacters, apiCharacters] = await Promise.all([Character.findAll(), fetchAllCharactersFromAPI()])

    const characterMap = new Map<number, Character>()
    existingCharacters.forEach((c) => characterMap.set(c.id, c))

    let updated = 0
    let created = 0

    let addedOne = false

    for (const character of apiCharacters) {
      const existing = characterMap.get(character.id)
      const transformedCharacter = transformCharacter(character)

      // In case a character doesn't exist on db, we just add it to db, otherwise update it in case there are changes
      // between API and db
      if (!existing && !addedOne) {
        await Character.create(transformedCharacter)
        created++
        addedOne = true
      } else if (existing && hasChanged(existing, character)) {
        await Character.update(transformedCharacter, { where: { id: transformedCharacter.id } })
        updated++
      }

      if (addedOne && updated === 0) break
    }

    // Cleaning up all cache keys, but this is not optimal in production. Just applied for this example and for simplicity
    await redis.flushall()

    console.log(`Update completed: ${created} created, ${updated} updated`)
  } catch (error: any) {
    console.error('Error updating characters...', error)
  }
}
