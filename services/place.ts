'use server'
import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { places } from '@/mocks'
import { Accessibility, Bounds, ID, Place, PlaceInput } from '@/types'
import { parseJwt } from '@/utils'

import { getAuth } from './auth'

export const getPlaceById = async (id: string): Promise<Place | null> => {
  const token = getAuth()
  const res = await fetch(server + '/places/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { tags: ['places'] },
  })
  return res.ok ? ((await res.json()) as Place) : null
}

export const getPlacesByBounce = async (bounds: Bounds): Promise<Place[]> => {
  return places
}

export const getMyPlaces = async (): Promise<Place[] | number> => {
  const token = getAuth()
  const { uid } = parseJwt(token || '')
  const res = await fetch(server + '/users/' + uid + '/places', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { tags: ['places'] },
  })
  return res.ok ? ((await res.json()) as Place[]) : res.status
}

export const createPlace = async (input: PlaceInput): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/places', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'POST',
    body: JSON.stringify(input),
  })
  revalidateTag('places')
  return res.ok ? ((await res.json()) as ID) : res.status
}

export const setPlaceAccessibility = async (
  id: string,
  accessibility: Accessibility
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/places/' + id + '/accessibility', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'PUT',
    body: JSON.stringify({ accessibility }),
  })
  revalidateTag('places')
  return res.ok ? ((await res.json()) as ID) : res.status
}

export const setPlaceOwner = async (
  placeId: string,
  id: string
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/places/' + placeId + '/owner', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'PUT',
    body: JSON.stringify({ id }),
  })
  revalidateTag('places')
  return res.ok ? ((await res.json()) as ID) : res.status
}
