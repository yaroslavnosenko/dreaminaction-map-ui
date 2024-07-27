import { BoundsQuery } from '@/services/types'

export const parseBoundsFromSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined
}): BoundsQuery | null => {
  if (!searchParams['swLat']) {
    return null
  }
  return { swLat: 0, swLng: 0, neLat: 0, neLng: 0 }
}
