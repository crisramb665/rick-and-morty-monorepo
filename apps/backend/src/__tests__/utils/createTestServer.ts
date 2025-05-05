/** npm imports */
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

/** local imports */
import settings from '../../config/settings'
import { resolvers, typeDefs } from '../../graphql'
import { dbInstance } from '../../data/db'

export const createTestServer = async () => {
  const app = express()
  app.use(express.json())

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  server.applyMiddleware({ app, path: '/test' })

  const sequelize = dbInstance()

  await sequelize.sync({ force: true })

  return app
}
