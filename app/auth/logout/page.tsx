'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import useLocalStorageState from 'use-local-storage-state'

import { StorageKeys } from '@/constants'

export default function Logout() {
  const router = useRouter()
  const [auth, _, { removeItem }] = useLocalStorageState(StorageKeys.Auth)
  useEffect(() => {
    if (auth) removeItem()
    router.replace('/')
  }, [router, auth, removeItem])
  return null
}
