'use server'
import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { places } from '@/mocks'
import {
  Accessibility,
  Bounds,
  Category,
  FeatureMapping,
  ID,
  Place,
  PlaceInput,
} from '@/types'
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

export const getPlaces = async (
  accessibilities: Accessibility[],
  query?: string
): Promise<Place[]> => {
  return places
}

export const getPlacesByBounce = async (
  bounds: Bounds,
  accessibilities: Accessibility[],
  categories: Category[]
): Promise<Place[] | number> => {
  console.log(bounds)
  const search = new URLSearchParams()
  search.set('swLat', String(bounds.swLat))
  search.set('swLng', String(bounds.swLng))
  search.set('neLat', String(bounds.neLat))
  search.set('neLng', String(bounds.neLng))

  // search.set('categories', categories.join(','))
  // search.set('accessibilities', accessibilities.join(','))

  const res = await fetch(server + '/places/bounds?' + search.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['places'] },
  })
  return res.ok ? ((await res.json()) as Place[]) : res.status
}

export const getMyPlaces = async (): Promise<Place[] | number> => {
  const token = getAuth()
  if (!token) {
    return 403
  }
  const { uid } = parseJwt(token)
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
  console.log(res)
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

export const setPlaceFeatures = async (
  id: string,
  features: FeatureMapping[]
): Promise<ID | number> => {
  const token = getAuth()
  const res = await fetch(server + '/places/' + id + '/features', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    method: 'PUT',
    body: JSON.stringify({ features }),
  })
  revalidateTag('places')
  return res.ok ? ((await res.json()) as ID) : res.status
}
