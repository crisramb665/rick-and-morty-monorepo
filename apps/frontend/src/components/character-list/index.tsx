/** npm imports */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

/** local imports */
import { type CharactersResultQuery } from '../../graphql/types'
import GET_ALL_CHARACTERS_QUERY from '../../graphql/queries/getAllCharactersQuery.graphql'
import CharacterItem from './CharacterItem'

interface CharacterListProps {
  onSelectCharacter: (id: number) => void
}

const CharacterList = ({ onSelectCharacter }: CharacterListProps) => {
  const [search, setSearch] = useState<string>('')
  const { data, loading, error } = useQuery<CharactersResultQuery>(GET_ALL_CHARACTERS_QUERY) //! TODO: MUST CHANGE THE QUERY
  // console.log({ data, loading, error })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <div className="flex flex-col gap-4">
      <h1>Rick and Morty list</h1>
      <input
        className="p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Search or filter results"
        value={search}
        onChange={handleSearch}
      />

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error: {error.message}</p>}

      <ul className="flex flex-col gap-2">
        {data?.characters.map((c) => <CharacterItem key={c.id} character={c} onSelectCharacter={onSelectCharacter} />)}
      </ul>
    </div>
  )
}

export default CharacterList
