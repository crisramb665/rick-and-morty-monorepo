/** npm imports */
import { gql } from '@apollo/client'

export default gql`
  query Characters {
    characters {
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
