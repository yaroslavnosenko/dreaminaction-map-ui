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
  cookies().set('auth-token', res.token, { expires: Date.now() + 259200 })
  redirect('/account')
}
