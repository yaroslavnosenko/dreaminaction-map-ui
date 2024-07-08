'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { StorageKeys } from '@/constants'

export default function Logout() {
  const router = useRouter()
  localStorage.removeItem(StorageKeys.Auth)
  useEffect(() => {
    router.replace('/')
  }, [router])
  return null
}
