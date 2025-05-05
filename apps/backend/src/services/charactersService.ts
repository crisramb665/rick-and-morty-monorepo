/** local imports */
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
    return await Character.findAll()
  }

  @MeasureExecutionTime()
  async filteredCharacters(filters: FilteredCharacterProps) {
    const safeFilters = filters || {}

    const where = Object.entries(safeFilters)
      .filter(([_, value]) => value)
      .reduce(
        (acc: Record<string, any>, [key, value]) => {
          acc[key] = key === 'name' ? { $like: `%${value}%` } : value
          return acc
        },
        {} as Record<string, any>,
      )

    return Object.keys(where).length > 0 ? await Character.findAll({ where }) : await this.getAllCharacters()
  }
}

// export const getAllCharacters = async () => {
//   const characters = await Character.findAll()
//   return characters
// }

// export const filteredCharacters = async (filters: FilteredCharacterProps) => {
//   const safeFilters = filters || {}

//   const where = Object.entries(safeFilters)
//     .filter(([_, value]) => value)
//     .reduce(
//       (acc: Record<string, any>, [key, value]) => {
//         acc[key] = key === 'name' ? { $like: `%${value}%` } : value
//         return acc
//       },
//       {} as Record<string, any>,
//     )

//   const characters = Object.keys(where).length > 0 ? await Character.findAll({ where }) : await getAllCharacters()
//   return characters
// }
