import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { getAuth } from '@/services'
import { ID, User, UserRole } from '@/types'

export const getUsers = async (query?: string): Promise<User[] | number> => {
  const token = getAuth()
  const search = new URLSearchParams()
  if (query) {
    search.set('query', query)
  } else {
    search.delete('query')
  }
  const res = await fetch(server + '/users?' + search.toString(), {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: {
      tags: ['users'],
    },
  })

  return res.ok ? ((await res.json()) as User[]) : res.status
}

export const setRole = async (
  id: string,
  role: UserRole
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/users/' + id + '/role', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'PUT',
    body: JSON.stringify({ role }),
  })
  revalidateTag('users')
  return res.ok ? ((await res.json()) as ID) : res.status
}

export const deleteUser = async (id: string): Promise<number> => {
  const token = getAuth()
  const res = await fetch(server + '/users/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'DELETE',
  })
  revalidateTag('users')
  return res.status
}
