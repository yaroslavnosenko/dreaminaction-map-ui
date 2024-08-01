'use server'

import { redirect } from 'next/navigation'

import {
  createPlace,
  getUsers,
  setPlaceAccessibility,
  setPlaceFeatures,
  setPlaceOwner,
  updatePlace,
} from '@/services'
import { Accessibility, FeatureMapping, PlaceInput, User } from '@/types'

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

export const onSetPlaceAccessibility = async (
  id: string,
  acc: Accessibility
): Promise<Accessibility> => {
  const res = await setPlaceAccessibility(id, acc)
  if (typeof res === 'number') {
    redirect('/error')
  }
  return acc
}

export const onSetPlaceOwner = async (
  placeId: string,
  id: string
): Promise<void> => {
  const res = await setPlaceOwner(placeId, id)
  if (typeof res === 'number') {
    redirect('/error')
  }
}

export const onFetchUsers = async (query: string): Promise<User[]> => {
  const res = await getUsers(query)
  if (typeof res === 'number') {
    redirect('/error')
  }
  return res
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
