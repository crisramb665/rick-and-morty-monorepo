/** npm imports */
import React from 'react'

interface CharacterCardProps {
  name: string
  status: string
  species: string
  gender: string
  origin: string
  image: string
}

const CharacterCard = () => {
  return (
    <div>
      <div>
        <h2>"temporal name"</h2>
        <p>"temporal species"</p>
      </div>
    </div>
  )
}

export default CharacterCard
