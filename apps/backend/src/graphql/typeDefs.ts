/** npm imports */
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Character {
    id: Int!
    name: String!
    status: String!
    species: String!
    type: String!
    gender: String!
    origin: String!
    location: String!
    image: String!
    episode: [String!]!
    url: String!
    created: String!
  }

  input FilteredCharacterType {
    name: String
    status: String
    species: String
    gender: String
    origin: String
  }

  type Query {
    characters: [Character]
    filterCharacters(filters: FilteredCharacterType): [Character]
    findCharacterById(id: Int!): Character
  }
`
