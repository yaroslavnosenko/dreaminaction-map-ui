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
  firstName?: string
  lastName?: string
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
  owner?: User
  availableFeatures?: Feature[]
  unavailableFeatures?: Feature[]
}
