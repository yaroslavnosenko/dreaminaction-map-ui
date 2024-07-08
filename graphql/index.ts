import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { StorageKeys } from '@/constants'

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(StorageKeys.Auth)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
