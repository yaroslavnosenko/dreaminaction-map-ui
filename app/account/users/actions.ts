'use server'

import { createUser, deleteUser, setRole } from '@/services/user'
import { UserInput, UserRole } from '@/types'

export const onSetRole = async (
  id: string,
  role: UserRole
): Promise<UserRole> => {
  await setRole(id, role)
  return role
}

export const onDelete = async (id: string) => {
  await deleteUser(id)
}

export const onCreate = async (input: UserInput) => {
  await createUser(input)
}
