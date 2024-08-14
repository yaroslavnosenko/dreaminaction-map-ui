'use server'
import { revalidateTag } from 'next/cache'

import { server } from '@/configs'
import { getToken } from '@/services/auth'
import {
  Accessibility,
  Category,
  FeatureMapping,
  ID,
  Place,
  PlaceInput,
} from '@/types'

export const getPlaceById = async (id: string): Promise<Place | number> => {
  const req = await fetch(server + '/places/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['places'] },
  })
  return req.ok ? await req.json() : req.status
}

export const getPlaces = async (
  accessibilities?: Accessibility[],
  query?: string
): Promise<Place[] | number> => {
  const search = new URLSearchParams()
  if (accessibilities && accessibilities.length !== 0) {
    search.set('accessibilities', accessibilities.join(','))
  }
  if (query) {
    search.set('query', query)
  }
  const req = await fetch(server + '/places?' + search.toString(), {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    next: { tags: ['places'] },
  })
  return req.ok ? await req.json() : req.status
}

export const getMapPlaces = async (
  categories?: Category[],
  accessibilities?: Accessibility[]
): Promise<Place[]> => {
  const search = new URLSearchParams()
  if (categories && categories.length !== 0) {
    search.set('categories', categories.join(','))
  }
  if (accessibilities && accessibilities.length !== 0) {
    search.set('accessibilities', accessibilities.join(','))
  }
  const req = await fetch(server + '/places/map?' + search.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['places'] },
  })
  return await req.json()
}

export const createPlace = async (input: PlaceInput): Promise<ID | number> => {
  revalidateTag('places')
  const res = await fetch(server + '/places', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'POST',
    body: JSON.stringify(input),
  })
  return res.ok ? await res.json() : res.status
}

export const updatePlace = async (
  id: string,
  input: PlaceInput
): Promise<ID | number> => {
  revalidateTag('places')
  const req = await fetch(server + '/places/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'PUT',
    body: JSON.stringify(input),
  })
  return req.ok ? await req.json() : req.status
}

export const setPlaceFeatures = async (
  id: string,
  features: FeatureMapping[]
): Promise<ID | number> => {
  revalidateTag('places')
  const res = await fetch(server + '/places/' + id + '/features', {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'PUT',
    body: JSON.stringify({ features }),
  })
  return res.ok ? await res.json() : res.status
}

export const deletePlace = async (id: string): Promise<number> => {
  revalidateTag('places')
  const req = await fetch(server + '/places/' + id, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getToken(),
    },
    method: 'DELETE',
  })
  return req.status
}
