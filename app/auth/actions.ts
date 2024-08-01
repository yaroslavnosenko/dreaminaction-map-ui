'use server'

import { getToken } from '@/services'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const onAuth = async (inputToken: string) => {
  const { token } = await getToken(inputToken as string, 'facebook')
  cookies().set('auth-token', token)
  redirect('/account')
}
