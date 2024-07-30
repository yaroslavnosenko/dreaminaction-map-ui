import { Accessibility, Category } from './enums'

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
  accessibility: Accessibility
  address: string
  lat: number
  lng: number
  description?: string
}
