/** local imports */
import { Character } from '../../graphql/types'

interface CharacterItemProps {
  character: Character
  onSelectCharacter: (id: number) => void
}

const CharacterItem = ({ character, onSelectCharacter }: CharacterItemProps) => (
  <li
    className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-200 rounded-md transition"
    onClick={() => onSelectCharacter(character.id)}
  >
    <img className="w-10 h-10 rounded-full object-cover" src={character.image} alt={character.name} />
    <div>
      <p className="font-medium">{character.name}</p>
      <p className="text-sm text-gray-600">{character.species}</p>
    </div>
  </li>
)

export default CharacterItem
