/** npm imports */
import { useQuery } from '@apollo/client'

/** local imports */
import { type SingleCharacterResultQuery } from '../../graphql/types'
import FIND_CHARACTER_BY_ID from '../../graphql/queries/findCharacterById.graphql'
import { useFavorites } from '../../context/FavoritesContext'
import CommentsSection from './CommentsSection'

interface CharacterCardProps {
  characterId: number
}

const CharacterCard = ({ characterId }: CharacterCardProps) => {
  const { data, loading, error } = useQuery<SingleCharacterResultQuery>(FIND_CHARACTER_BY_ID, {
    variables: { id: characterId },
  })
  const { isFavorite, toggleFavorite } = useFavorites()

  const character = data?.findCharacterById

  if (loading) return <p className="text-gray-500">Loading character...</p>
  if (error) return <p className="text-red-500">Error: {error.message}</p>
  if (!character) return <p>Character not found.</p>

  const favorite = character && isFavorite(character.id.toString())

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-6">
        <img className="w-40 h-40 object-cover rounded-xl shadow" src={character.image} alt={character.name} />
        <div>
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-gray-600">Specie: {character.species}</p>
          <p className="text-gray-600">Status: {character.status}</p>
          <p className="text-gray-600">Gender: {character.gender}</p>
          <button
            className={`mt-4 px-4 py-2 rounded-lg text-white transition ${favorite ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={() => character && toggleFavorite(character.id.toString())}
          >
            {favorite ? 'Remove from favorites' : 'Mark as Favorite'}
          </button>
        </div>
      </div>

      <CommentsSection characterId={character.id} />
    </div>
  )
}

export default CharacterCard
