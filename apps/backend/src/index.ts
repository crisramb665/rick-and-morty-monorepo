/** npm imports */
import express from 'express'
import type { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import http from 'http'

/** local imports */
import { typeDefs, resolvers } from './graphql'

const app: Express = express()

app.use(express.json())

const httpServer = http.createServer(app)

/**
 * Async function to start the server and initialize Apollo Server
 * @returns {Promise<void>} Resolves when server is successfully started
 */
const startup = async (): Promise<void> => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  await apolloServer.start()

  // Apply Apollo middleware to Express app
  // This creates the GraphQL endpoint (default: /graphql)
  apolloServer.applyMiddleware({ app })

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 [server]: ready at http://localhost:4000`)
}

startup()
