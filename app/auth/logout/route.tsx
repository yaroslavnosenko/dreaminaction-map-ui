'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  console.log('HAHAHA')
  cookies().delete('auth-token')
  redirect('/auth')
}
