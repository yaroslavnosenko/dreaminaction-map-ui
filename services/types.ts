export enum UserRole {
  user = 'user',
  manager = 'manager',
  admin = 'admin',
}

export enum Category {
  food = 'food',
  drinks = 'drinks',
  groceries = 'groceries',
  shopping = 'shopping',
  health = 'health',
  hotels = 'hotels',
  transport = 'transport',
  sites = 'sites',
}

export enum Accessibility {
  unknown = 0,
  non_compliant = 1,
  partially_compliant = 2,
  compliant = 3,
}

export interface IdResponse {
  id: string
}

export interface TokenResponse {
  token: string
}

export interface UserRepsonse {
  id: string
  email: string
  role: UserRole
  firstName?: string
  lastName?: string
}

export interface FeatureResponse {
  id: string
  name: string
}

export interface PlaceResponse {
  id: string
  name: string
  category: Category
  accessibility: Accessibility
  address: string
  lat: number
  lng: number

  description?: string
  owner?: UserRepsonse
  availableFeatures?: FeatureResponse[]
  unavailableFeatures?: FeatureResponse[]
}

export interface BoundsQuery {
  neLat: number
  neLng: number
  swLat: number
  swLng: number
}
