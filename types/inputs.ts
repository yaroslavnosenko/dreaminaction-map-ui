import { Category } from './enums'

export type Bounds = {
  neLat: number
  neLng: number
  swLat: number
  swLng: number
}

export type FeatureInput = {
  name: string
}

export type PlaceInput = {
  id: string
  name: string
  category: Category
  address: string
  lat: number
  lng: number
  description?: string
}

export type FeatureMapping = {
  id: string
  available: boolean
}
