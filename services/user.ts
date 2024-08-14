import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { getToken } from '@/services/auth'
import { ID, User, UserInput, UserRole } from '@/types'

export const getUsers = async (): Promise<User[] | number> => {
  const req = await fetch(server + '/users', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    next: {
      tags: ['users'],
    },
  })
  return req.ok ? await req.json() : req.status
}

export const createUser = async (input: UserInput): Promise<ID | number> => {
  revalidateTag('users')
  const req = await fetch(server + '/users', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'POST',
    body: JSON.stringify(input),
  })
  return req.ok ? await req.json() : req.status
}

export const setRole = async (
  id: string,
  role: UserRole
): Promise<ID | number> => {
  revalidateTag('users')
  const res = await fetch(server + '/users/' + id + '/role', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'PUT',
    body: JSON.stringify({ role }),
  })
  return res.ok ? await res.json() : res.status
}

export const deleteUser = async (id: string) => {
  revalidateTag('users')
  await fetch(server + '/users/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'DELETE',
  })
}
