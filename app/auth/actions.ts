'use server'

import { sendOtp } from '@/services/auth'
import { redirect } from 'next/navigation'

export const onSendOtp = async (email: string) => {
  await sendOtp({ email })
  redirect('/auth/' + email)
}
