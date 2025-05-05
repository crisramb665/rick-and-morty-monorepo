/** npm imports */
import { gql } from '@apollo/client'

export default gql`
  query FilterCharacters($filters: FilteredCharacterType) {
    filterCharacters(filters: $filters) {
      id
      name
      status
      species
      type
      gender
      origin
      location
      image
      episode
      url
      created
    }
  }
`
