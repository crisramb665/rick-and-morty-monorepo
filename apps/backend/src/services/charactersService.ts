/** local imports */
import { Character } from '../data/models/character.model'

// Used to filter characters based on specific parameters
export type FilteredCharacterProps = {
  name: string
  status: string
  species: string
  gender: string
  origin: string
}

export const getAllCharacters = async () => {
  const characters = await Character.findAll()
  return characters
}

export const filteredCharacters = async (filters: FilteredCharacterProps) => {
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

  const characters = Object.keys(where).length > 0 ? await Character.findAll({ where }) : await getAllCharacters()
  return characters
}
