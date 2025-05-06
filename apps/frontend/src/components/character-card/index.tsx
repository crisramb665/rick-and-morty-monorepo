/** npm imports */
import { useQuery } from '@apollo/client'

/** local imports */
import { type SingleCharacterResultQuery } from '../../graphql/types'
import FIND_CHARACTER_BY_ID from '../../graphql/queries/findCharacterById.graphql'

interface CharacterCardProps {
  characterId: number
}

const CharacterCard = ({ characterId }: CharacterCardProps) => {
  const { data, loading, error } = useQuery<SingleCharacterResultQuery>(FIND_CHARACTER_BY_ID, {
    variables: { id: characterId },
  })

  if (loading) return <p className="text-gray-500">Loading character...</p>
  if (error) return <p className="text-red-500">Error: {error.message}</p>

  const character = data?.findCharacterById

  if (!character) return <p>Character not found.</p>

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-6">
        <img className="w-40 h-40 object-cover rounded-xl shadow" src={character.image} alt={character.name} />
        <div>
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-gray-600">Specie: {character.species}</p>
          <p className="text-gray-600">Status: {character.status}</p>
          <p className="text-gray-600">Gender: {character.gender}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Mark as favorite
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Comments</h3>
        <p className="text-gray-500">Comments section</p>
      </div>
    </div>
  )
}

export default CharacterCard
