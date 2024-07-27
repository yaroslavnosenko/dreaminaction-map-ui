import { places } from '@/mocks'
import { PlaceResponse } from './types'

export const getPlacesByBounce = async (): Promise<PlaceResponse[]> => {
  return places
}
