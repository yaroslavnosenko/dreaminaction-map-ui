'use server'

import { redirect } from 'next/navigation'

import {
  createPlace,
  getUsers,
  setPlaceAccessibility,
  setPlaceOwner,
} from '@/services'
import { Accessibility, PlaceInput, User } from '@/types'

export const onPlaceCreate = async (input: PlaceInput) => {
  const res = await createPlace(input)
  if (typeof res === 'number') {
    redirect('/error')
  }
  const { id } = res
  redirect('/account/places/' + id)
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
