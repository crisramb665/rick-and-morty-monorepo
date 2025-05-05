import request from 'supertest'
import Redis from 'ioredis'
import { createTestServer } from './utils/createTestServer'
import { Character } from '../data/models/character.model'
import { dbInstance } from '../data/db'
import sequelize from 'sequelize-typescript'

const mockedRedis = Redis as jest.Mocked<typeof Redis>

let app: any

beforeAll(async () => {
  app = await createTestServer()

  await Character.bulkCreate([
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: 'Earth (C-137)',
      location: 'anywhere',
      image: '',
      episode: ['1', '2'],
      url: '',
      created: '',
    } as Character,
    // {
    //   id: 2,
    //   name: 'Morty Smith',
    //   status: 'Alive',
    //   species: 'Human',
    //   gender: 'Male',
    //   origin: 'Earth (Replacement Dimension)',
    // },
  ])
})

afterAll(async () => {
  // Close the database connection
  const sequelize = dbInstance()
  await sequelize.close()
})

describe('GraphQL Character Queries', () => {
  it('fetches all characters', async () => {
    const query = {
      query: `{
        characters {
          id
          name
          origin
        }
      }`,
    }

    const response = await request(app).post('/test').send(query)
    expect(response.status).toBe(200)
    expect(response.body.data.characters).toHaveLength(1)
  })

  // it('filters characters by name', async () => {
  //   const query = {
  //     query: `{
  //       filterCharacters(filters: { name: "Rick" }) {
  //         name
  //       }
  //     }`,
  //   }

  //   const response = await request(app).post('/test').send(query)
  //   expect(response.body.data.filterCharacters[0].name).toBe('Rick Sanchez')
  // })
})
