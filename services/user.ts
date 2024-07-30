import { server } from '@/configs'
import { User } from '@/types'

export const getUsers = async (
  authToken: string,
  query?: string
): Promise<User[] | number> => {
  const search = new URLSearchParams()
  if (query) search.set('query', query)
  const res = await fetch(server + '/users?' + search.toString(), {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + authToken,
    },
  })
  return res.status === 200 ? ((await res.json()) as User[]) : res.status
}
