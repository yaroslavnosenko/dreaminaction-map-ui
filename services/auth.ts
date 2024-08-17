import { cookies } from 'next/headers'

import { server } from '@/configs'
import { OtpInput, OtpValidateInput, Token, User } from '@/types'

export const me = async (): Promise<User | null> => {
  try {
    const req = await fetch(server + '/auth/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getToken(),
      },
      cache: 'no-cache',
    })
    const data = await req.json()
    return data as User
  } catch {
    return null
  }
}

export const sendOtp = async (input: OtpInput) => {
  await fetch(server + '/auth/otp', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export const validateOtp = async (
  input: OtpValidateInput
): Promise<Token | number> => {
  const res = await fetch(server + '/auth/otp/validate', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(input),
  })
  return res.ok ? await res.json() : res.status
}

export const getToken = (): string | null => {
  return cookies().get('auth-token')?.value || null
}
