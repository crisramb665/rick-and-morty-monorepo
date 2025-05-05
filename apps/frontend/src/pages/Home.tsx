/** npm imports */
import { useQuery } from '@apollo/client'

/** local imports */
import CharacterCard from '../components/character-card'
import { type CharactersResultQuery } from '../graphql/types.js'
import GET_ALL_CHARACTERS_QUERY from '../graphql/queries/getAllCharactersQuery.graphql'

const Home = () => {
  const { data, loading, error } = useQuery<CharactersResultQuery>(GET_ALL_CHARACTERS_QUERY)
  console.log({ data, loading, error })

  return (
    <div>
      <CharacterCard />
    </div>
  )
}

export default Home
