'use server'
import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { Feature, FeatureInput, ID } from '@/types'

import { getAuth } from './auth'

export const getFeatures = async (): Promise<Feature[]> => {
  const res = await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['features'] },
  })
  return await res.json()
}

export const createFeature = async (
  data: FeatureInput
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('features')
  return res.ok ? ((await res.json()) as ID) : res.status
}

export const updateFeature = async (
  id: string,
  data: FeatureInput
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
  revalidateTag('features')
  return res.ok ? ((await res.json()) as ID) : res.status
}

export const deleteFeature = async (id: string): Promise<number> => {
  const token = getAuth()
  const res = await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'DELETE',
  })
  revalidateTag('features')
  return res.status
}
