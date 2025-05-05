/** local imports */
import { CharacterService, type FilteredCharacterProps } from '../services/charactersService'

const charactersService = new CharacterService()

export const resolvers = {
  Query: {
    characters: async () => {
      const characters = await charactersService.getAllCharacters()
      return characters
    },
    filterCharacters: async (_: unknown, args: { filters: FilteredCharacterProps }) => {
      const filtered = await charactersService.filteredCharacters(args.filters)
      return filtered
    },
  },
}
