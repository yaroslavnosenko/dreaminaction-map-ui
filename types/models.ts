import { Accessibility, Category, UserRole } from './enums'

export type ID = {
  id: string
}

export type Token = {
  token: string
}

export type Feature = {
  id: string
  name: string
}

export type User = {
  id: string
  email: string
  role: UserRole
}

export interface Place {
  id: string
  name: string
  category: Category
  accessibility: Accessibility
  address: string
  lat: number
  lng: number

  description?: string
  availableFeatures?: Feature[]
  unavailableFeatures?: Feature[]
}
