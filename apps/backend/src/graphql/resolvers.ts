/** local imports */
import { type FilteredCharacterProps, filteredCharacters, getAllCharacters } from '../services/charactersService'

export const resolvers = {
  Query: {
    characters: async () => {
      const characters = await getAllCharacters()
      return characters
    },
    filterCharacters: async (_: unknown, args: { filters: FilteredCharacterProps }) => {
      const filtered = await filteredCharacters(args.filters)
      return filtered
    },
  },
}
