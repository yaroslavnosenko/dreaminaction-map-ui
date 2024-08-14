'use server'

import { redirect } from 'next/navigation'

import {
  createPlace,
  deletePlace,
  setPlaceFeatures,
  updatePlace,
} from '@/services/place'
import { FeatureMapping, PlaceInput } from '@/types'

export const onPlaceCreate = async (input: PlaceInput) => {
  const res = await createPlace(input)
  if (typeof res === 'number') {
    redirect('/error')
  }
  const { id } = res
  redirect('/account/places/' + id)
}

export const onPlaceUpdate = async (id: string, input: PlaceInput) => {
  const res = await updatePlace(id, input)
  if (typeof res === 'number') {
    redirect('/error')
  }
  redirect('/account/places/' + res.id)
}

export const onSetFeatures = async (
  id: string,
  features: FeatureMapping[]
): Promise<void> => {
  const res = await setPlaceFeatures(id, features)
  if (typeof res === 'number') {
    redirect('/error')
  }
}

export const onPlaceDelete = async (id: string) => {
  await deletePlace(id)
  redirect('/account/places')
}
