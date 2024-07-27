import { server } from '@/configs'
import { TokenResponse } from './types'

export const auth = async (
  token: string,
  provider: 'facebook' | 'google'
): Promise<TokenResponse> => {
  const res = await fetch(server + '/auth', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ provider, token }),
  })
  return (await res.json()) as TokenResponse
}
