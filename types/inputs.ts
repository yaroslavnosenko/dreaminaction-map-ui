import { Accessibility, Category, UserRole } from './enums'

export type FeatureInput = {
  name: string
}

export type OtpInput = {
  email: string
}

export type OtpValidateInput = {
  email: string
  otp: string
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

export type UserInput = {
  email: string
  role: UserRole
}

export type FeatureMapping = {
  id: string
  available: boolean
}
