import { server } from '@/configs'
import { revalidateTag } from 'next/cache'
import { FeatureRequest, FeatureResponse, IdResponse } from './types'

export const getFeatures = async (): Promise<FeatureResponse[]> => {
  const res = await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['features'] },
  })
  return await res.json()
}

export const createFeature = async (
  authToken: string,
  data: FeatureRequest
): Promise<IdResponse | number> => {
  const res = await fetch(server + '/features', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + authToken,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('features')
  return res.status === 201 ? ((await res.json()) as IdResponse) : res.status
}

export const updateFeature = async (
  authToken: string,
  id: string,
  data: FeatureRequest
): Promise<IdResponse | number> => {
  const res = await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + authToken,
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
  revalidateTag('features')
  return res.status === 200 ? ((await res.json()) as IdResponse) : res.status
}

export const deleteFeature = async (
  authToken: string,
  id: string
): Promise<number> => {
  const res = await fetch(server + '/features/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + authToken,
    },
    method: 'DELETE',
  })
  revalidateTag('features')
  return res.status
}
