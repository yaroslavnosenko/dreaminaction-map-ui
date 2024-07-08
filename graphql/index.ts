import { StorageKeys } from '@/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = () => {
  const token = localStorage.getItem(StorageKeys.Auth)?.replace(/\"/g, '')
  const headers = token ? { authorization: 'Bearer ' + token } : undefined
  return new ApolloClient({
    uri: 'http://localhost:3005/',
    cache: new InMemoryCache(),
    headers,
  })
}
