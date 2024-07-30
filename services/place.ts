import { places } from '@/mocks'
import { Bounds, Place, PlaceInput } from '@/types'

export const getPlacesByBounce = async (bounds: Bounds): Promise<Place[]> => {
  return places
}

export const getMyPlaces = async (): Promise<Place[]> => {
  return places
}

export const createPlace = async (input: PlaceInput): Promise<Place[]> => {
  return places
}

export const getPlaceById = async (id: string): Promise<Place | null> => {
  return places.find((place) => place.id === id) || null
}
