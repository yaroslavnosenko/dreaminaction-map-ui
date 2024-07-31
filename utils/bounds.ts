import { Bounds } from '@/types'

export const parseBoundsFromSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined
}): Bounds | null => {
  if (!searchParams['swLat']) {
    return null
  }
  return {
    swLat: parseFloat(searchParams['swLat'] as string),
    swLng: parseFloat(searchParams['swLng'] as string),
    neLat: parseFloat(searchParams['neLat'] as string),
    neLng: parseFloat(searchParams['neLng'] as string),
  }
}
