'use server'

import { createFeature, deleteFeature, updateFeature } from '@/services'
import { FeatureRequest } from '@/services/types'
import { cookies } from 'next/headers'

export const onCreate = async (
  data: FeatureRequest
): Promise<string | null> => {
  const token = cookies().get('auth-token')?.value
  const res = await createFeature(token || '', data)
  if (typeof res === 'number') {
    return null
  }
  return res.id
}

export const onUpdate = async (
  id: string,
  data: FeatureRequest
): Promise<string | null> => {
  const token = cookies().get('auth-token')?.value
  const res = await updateFeature(token || '', id, data)
  if (typeof res === 'number') {
    return null
  }
  return res.id
}

export const onDelete = async (id: string) => {
  const token = cookies().get('auth-token')?.value
  await deleteFeature(token || '', id)
}
