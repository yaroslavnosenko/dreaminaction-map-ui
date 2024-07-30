'use server'

import { createFeature, deleteFeature, updateFeature } from '@/services'
import { FeatureInput } from '@/types'
import { redirect } from 'next/navigation'

export const onCreate = async (input: FeatureInput) => {
  const res = await createFeature(input)
  if (typeof res === 'number') {
    redirect('/error')
  }
  redirect('/account/features')
}

export const onUpdate = async (id: string, input: FeatureInput) => {
  const res = await updateFeature(id, input)
  if (typeof res === 'number') {
    redirect('/error')
  }
  redirect('/account/features')
}

export const onDelete = async (id: string) => {
  const res = await deleteFeature(id)
  if (res !== 200) {
    redirect('/error')
  }
  redirect('/account/features')
}
