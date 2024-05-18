import { PlaceAccessibility, PlaceType } from '@/types'

export const places = [
  {
    name: 'Uzhhorod Castle',
    address: 'Kapitulna St, 33, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.services,
    latitude: 0,
    longitude: 0,
    accessibility: PlaceAccessibility.partially_compliant,
  },
  {
    name: 'Dastor',
    address: 'Sobranetska St, 89, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.groceries,
    latitude: 0,
    longitude: 0,
    accessibility: PlaceAccessibility.compliant,
  },
  {
    name: 'Duet Plus',
    address: 'Koshytska St, 6, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.food,
    latitude: 0,
    longitude: 0,
    accessibility: PlaceAccessibility.partially_compliant,
  },
  {
    name: 'Sovyne Hnizdo',
    address:
      'Ferentsa Rakotsi St, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.services,
    latitude: 0,
    longitude: 0,
    accessibility: PlaceAccessibility.non_compliant,
  },
  {
    name: 'White Hills Hotel spa & sport',
    address: 'Main ST 7, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.hotels,
    latitude: 0,
    longitude: 0,
    accessibility: PlaceAccessibility.non_compliant,
  },
]
