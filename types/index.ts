export enum PlaceType {
  food = 'food',
  drinks = 'drinks',
  groceries = 'groceries',
  shopping = 'shopping',
  services = 'services',
  health = 'health',
  hotels = 'hotels',
  transport = 'transport',
}

export enum PlaceAccessibility {
  unknown = 0,
  non_compliant = 1,
  partially_compliant = 2,
  compliant = 3,
}

export type Place = {
  name: string
  address: string
  type: PlaceType
  accessibility: PlaceAccessibility
  lng: number
  lat: number
}
