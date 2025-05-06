/** npm imports */
import { useState } from 'react'

/** local imports */

import CharacterList from '../components/character-list'
import CharacterCard from '../components/character-card'

const Home = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null)

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-3">
      <div className="bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
        <CharacterList onSelectCharacter={setSelectedCharacterId} />
      </div>

      <div className="md:col-span-2 p-6 overflow-y-auto">
        {selectedCharacterId ? (
          <CharacterCard />
        ) : (
          <p className="text-gray-500">Select a character to see the details</p>
        )}
      </div>
    </div>
  )
}

export default Home
