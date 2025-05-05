/** npm imports */
import 'reflect-metadata'
import express from 'express'
import type { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'

/** local imports */
import settings from './config/settings'
import { dbInstance } from './data/db'
import { typeDefs, resolvers } from './graphql'
import { loggerPlugin } from './pluggins/loggerPlugin'

const app: Express = express()

app.use(express.json())

const httpServer = http.createServer(app)

/**
 * Async function to start the server and initialize Apollo Server
 * @returns {Promise<void>} Resolves when server is successfully started
 */
const startup = async (): Promise<void> => {
  try {
    const sequelize = dbInstance()
    await sequelize.authenticate()

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggerPlugin],
    })

    await apolloServer.start()

    // Apply Apollo middleware to Express app
    // This creates the GraphQL endpoint (default: /graphql)
    apolloServer.applyMiddleware({ app })

    await new Promise<void>((resolve) => httpServer.listen({ port: settings.Port }, resolve))
    console.log(`🚀 [server]: ready at http://localhost:${settings.Port}`)
  } catch (error: any) {
    console.error('Error starting the server or connecting database:', error.message)
    throw new Error('Server startup failed')
  }
}

startup()
