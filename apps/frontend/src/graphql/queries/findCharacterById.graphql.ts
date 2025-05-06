/** npm imports */
import { gql } from '@apollo/client'

export default gql`
  query FindCharacterById($id: Int!) {
    findCharacterById(id: $id) {
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
