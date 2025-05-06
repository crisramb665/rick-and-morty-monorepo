export type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: string
  location: string
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharactersResultQuery = {
  readonly characters: Character[]
}

export type SingleCharacterResultQuery = {
  readonly findCharacterById: Character
}
