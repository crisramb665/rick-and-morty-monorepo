/** npm imports */
import { GraphQLRequestContext } from 'apollo-server-core'

// Logger middleware to prints information about query requests
export const loggerPlugin = {
  async requestDidStart(requestContext: GraphQLRequestContext) {
    const { request } = requestContext

    // filtering out Instrospection queries for now, even if we're at development enviroment
    if (request.operationName === 'IntrospectionQuery' || request.query?.includes('__schema')) return {}

    console.log('📓 New GraphQL request received!: ')
    console.log('❕ Operation Name: ', request.operationName)
    console.log('❕ Query: ', request.query)
    console.log('❕ Variables: ', request.variables)

    return {
      async willSendResponse(context: any) {
        console.log('Response send!')
      },
    }
  },
}
