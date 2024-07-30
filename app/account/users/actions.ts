'use server'

import { deleteUser, setRole } from '@/services'
import { UserRole } from '@/types'
import { redirect } from 'next/navigation'

export const onSetRole = async (
  id: string,
  role: UserRole
): Promise<UserRole> => {
  const res = await setRole(id, role)
  if (typeof res === 'number') {
    redirect('/error')
  }
  return role
}

export const onDelete = async (id: string) => {
  const res = await deleteUser(id)
  if (res !== 200) {
    redirect('/error')
  }
}
