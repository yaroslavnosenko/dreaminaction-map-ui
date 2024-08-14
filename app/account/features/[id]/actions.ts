'use server'

import { createFeature, deleteFeature, updateFeature } from '@/services/feature'
import { FeatureInput } from '@/types'
import { redirect } from 'next/navigation'

export const onCreate = async (input: FeatureInput) => {
  await createFeature(input)
  redirect('/account/features')
}

export const onUpdate = async (id: string, input: FeatureInput) => {
  await updateFeature(id, input)
  redirect('/account/features')
}

export const onDelete = async (id: string) => {
  await deleteFeature(id)
  redirect('/account/features')
}
