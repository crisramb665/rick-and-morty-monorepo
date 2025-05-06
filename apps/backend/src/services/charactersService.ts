/** local imports */
import redis from '../config/redis'
import { Character } from '../data/models/character.model'
import { MeasureExecutionTime } from '../pluggins/measureExecution'

// Used to filter characters based on specific parameters
export type FilteredCharacterProps = {
  name: string
  status: string
  species: string
  gender: string
  origin: string
}

// Service created as a Class in order to use decorators on its methods
export class CharacterService {
  @MeasureExecutionTime()
  async getAllCharacters() {
    const cacheKey = `allCharacters`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) return JSON.parse(cachedData)

    const allCharacters = await Character.findAll()

    await redis.set(cacheKey, JSON.stringify(allCharacters), 'EX', 300) // Expires within 5 minutes
    return allCharacters
  }

  @MeasureExecutionTime()
  async filteredCharacters(filters: FilteredCharacterProps) {
    const safeFilters = filters || {}

    const cacheKey = `characters:${JSON.stringify(safeFilters)}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) return JSON.parse(cachedData)

    const where = Object.entries(safeFilters)
      .filter(([_, value]) => value)
      .reduce(
        (acc: Record<string, any>, [key, value]) => {
          acc[key] = key === 'name' ? { $like: `%${value}%` } : value
          return acc
        },
        {} as Record<string, any>,
      )

    const characters =
      Object.keys(where).length > 0 ? await Character.findAll({ where }) : await this.getAllCharacters()

    await redis.set(cacheKey, JSON.stringify(characters), 'EX', 300) // Expires within 5 minutes
    return characters
  }

  @MeasureExecutionTime()
  async findCharacterById(id: number) {
    const cacheKey = `character:${id}`
    const cachedData = await redis.get(cacheKey)

    if (cachedData) return JSON.parse(cachedData)

    const foundCharacter = await Character.findByPk(id)
    if (foundCharacter) await redis.set(cacheKey, JSON.stringify(foundCharacter), 'EX', 300) // Expires within 5 minutes

    return foundCharacter
  }
}
