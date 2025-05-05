/** npm imports */
import { ApolloClient, InMemoryCache } from '@apollo/client'

/** local imports */
import { GRAPHQL_API_URL } from '../config/constants'

//! NOTE: credentials: 'include' won't be used since I haven't configured the proper CORS policy
const client = new ApolloClient({ uri: GRAPHQL_API_URL, cache: new InMemoryCache(), credentials: '' })

export default client
