import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = () => {
  return new ApolloClient({
    uri: 'http://localhost:3005/',
    cache: new InMemoryCache(),
  })
}
