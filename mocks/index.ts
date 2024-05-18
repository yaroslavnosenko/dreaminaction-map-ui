import { Place, PlaceAccessibility, PlaceType } from '@/types'

export const places: Place[] = [
  {
    name: 'Uzhhorod Castle',
    address: 'Kapitulna St, 33, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.services,
    lat: 48.62,
    lng: 22.28,
    accessibility: PlaceAccessibility.partially_compliant,
  },
  {
    name: 'Dastor',
    address: 'Sobranetska St, 89, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.groceries,
    lat: 48.645,
    lng: 22.295,
    accessibility: PlaceAccessibility.compliant,
  },
  {
    name: 'Duet Plus',
    address: 'Koshytska St, 6, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.food,
    lat: 48.61,
    lng: 22.27,
    accessibility: PlaceAccessibility.partially_compliant,
  },
  {
    name: 'Sovyne Hnizdo',
    address:
      'Ferentsa Rakotsi St, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.services,
    lat: 48.61,
    lng: 22.3,
    accessibility: PlaceAccessibility.non_compliant,
  },
  {
    name: 'White Hills Hotel spa & sport',
    address: 'Main ST 7, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    type: PlaceType.hotels,
    lat: 48.627,
    lng: 22.29,
    accessibility: PlaceAccessibility.non_compliant,
  },
]
