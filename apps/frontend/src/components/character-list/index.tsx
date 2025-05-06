/** npm imports */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

/** local imports */
import { type CharactersResultQuery } from '../../graphql/types'
import GET_ALL_CHARACTERS_QUERY from '../../graphql/queries/getAllCharactersQuery.graphql'
import CharacterItem from './CharacterItem'
import { useFavorites } from '../../context/FavoritesContext'

interface CharacterListProps {
  onSelectCharacter: (id: number) => void
}

const CharacterList = ({ onSelectCharacter }: CharacterListProps) => {
  const [search, setSearch] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { data, loading, error } = useQuery<CharactersResultQuery>(GET_ALL_CHARACTERS_QUERY) //! TODO: MUST CHANGE THE QUERY
  // console.log({ data, loading, error })

  const { isFavorite } = useFavorites()

  const sortedCharacters = [...(data?.characters || [])].sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  const favoriteCharacters = sortedCharacters.filter((c) => isFavorite(c.id.toString()))
  const nonFavoriteCharacters = sortedCharacters.filter((c) => !isFavorite(c.id.toString()))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Rick and Morty list</h1>

      <input
        className="p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Search or filter results"
        value={search}
        onChange={handleSearch}
      />
      <button
        className="self-start px-2 py-1 bg-green-700 text-white rounded hover:bg-green-600 transition"
        onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
      >
        Sort by Name ({sortOrder === 'asc' ? 'Z-A' : 'A-Z'})
      </button>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error: {error.message}</p>}

      {favoriteCharacters.length > 0 && (
        <>
          <h2 className="text-md font-medium text-gray-600">STARRED CHARACTERS ({favoriteCharacters.length})</h2>
          <ul className="flex flex-col gap-2 divide-y divide-gray-200">
            {favoriteCharacters.map((c) => (
              <CharacterItem key={c.id} character={c} onSelectCharacter={onSelectCharacter} />
            ))}
          </ul>
        </>
      )}

      {nonFavoriteCharacters.length > 0 && (
        <>
          <h2 className="text-md font-medium text-gray-600"> CHARACTERS ({nonFavoriteCharacters.length})</h2>
          <ul className="flex flex-col gap-2 divide-y divide-gray-200">
            {nonFavoriteCharacters.map((c) => (
              <CharacterItem key={c.id} character={c} onSelectCharacter={onSelectCharacter} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default CharacterList
