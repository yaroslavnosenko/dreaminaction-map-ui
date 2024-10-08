'use server'

import { validateOtp } from '@/services/auth'
import { OtpValidateInput } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const onValidateOtp = async (input: OtpValidateInput) => {
  const res = await validateOtp(input)
  if (typeof res === 'number') {
    return redirect('/auth')
  }
  cookies().set('auth-token', res.token, {
    maxAge: 3 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
    path: '/',
  })
  redirect('/account')
}
