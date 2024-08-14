'use server'
import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { getToken } from '@/services/auth'
import { Feature, FeatureInput } from '@/types'

export const getFeatures = async (): Promise<Feature[]> => {
  const res = await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['features'] },
  })
  return await res.json()
}

export const createFeature = async (data: FeatureInput) => {
  revalidateTag('features')
  await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const updateFeature = async (id: string, data: FeatureInput) => {
  revalidateTag('features')
  await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export const deleteFeature = async (id: string) => {
  revalidateTag('features')
  await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'DELETE',
  })
}
