import { server } from '@/configs'
import { Token } from '@/types'
import { cookies } from 'next/headers'

export const getToken = async (
  token: string,
  provider: 'facebook' | 'google'
): Promise<Token> => {
  const res = await fetch(server + '/auth', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ provider, token }),
  })
  return (await res.json()) as Token
}

export const getAuth = (): string | null => {
  return cookies().get('auth-token')?.value || null
}