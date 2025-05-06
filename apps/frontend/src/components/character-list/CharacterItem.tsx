/** npm imports */
import React from 'react'

/** local imports */
import { Character } from '../../graphql/types'
import { useFavorites } from '../../context/FavoritesContext'

interface CharacterItemProps {
  character: Character
  onSelectCharacter: (id: number) => void
}

const CharacterItem = ({ character, onSelectCharacter }: CharacterItemProps) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(character.id.toString())

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleFavorite(character.id.toString())
  }

  return (
    <li
      className="flex items-center justify-between gap-3 cursor-pointer p-2 hover:bg-gray-200 rounded-md transition"
      onClick={() => onSelectCharacter(character.id)}
    >
      <div className="flex items-center gap-3">
        <img className="w-10 h-10 rounded-full object-cover" src={character.image} alt={character.name} />
        <div>
          <p className="font-medium">{character.name}</p>
          <p className="text-sm text-gray-600">{character.species}</p>
        </div>
      </div>

      <button
        className="text-red-500 hover:scale-110 transition text-lg"
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={handleFavoriteClick}
      >
        {favorite ? '💚' : '🤍'}
      </button>
    </li>
  )
}

export default CharacterItem
