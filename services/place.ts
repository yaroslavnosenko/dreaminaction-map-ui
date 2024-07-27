import { places } from '@/mocks'
import { PlaceResponse } from './types'

export const getPlacesByBounce = async (): Promise<PlaceResponse[]> => {
  return places
}

export const getPlacesById = async (
  id: string
): Promise<PlaceResponse | null> => {
  return places.find((place) => place.id === id) || null
}
