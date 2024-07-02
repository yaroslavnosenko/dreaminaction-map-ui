import { Accessibility, Category, DeepPartial, Place } from '@/types'

export const places: DeepPartial<Place>[] = [
  {
    id: 'd6dcdd59-edd5-44f1-9fff-e5bc34e01f99',
    name: 'Uzhhorod Castle',
    address: 'Kapitulna St, 33, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.Sites,
    accessibility: Accessibility.PartiallyCompliant,
    featuresCount: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae diam sit amet tortor interdum mollis. Donec elementum, velit vel tristique suscipit, metus ante euismod ante, eget eleifend lacus tortor vel nibh.',
    lat: 48.62,
    lng: 22.28,
  },
  {
    id: '686ffb09-e15f-4673-af26-e29f91eba34c',
    name: 'Dastor',
    address: 'Sobranetska St, 89, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.Groceries,
    accessibility: Accessibility.Compliant,
    featuresCount: 17,
    lat: 48.645,
    lng: 22.295,
  },
  {
    id: 'cf6b9ca6-a5a7-436f-b714-8ea6e6822cd9',
    name: 'Duet Plus',
    address: 'Koshytska St, 6, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.Food,
    accessibility: Accessibility.PartiallyCompliant,
    featuresCount: 11,
    lat: 48.61,
    lng: 22.27,
  },
  {
    id: '9d063120-eb4c-4b95-9385-81f76f8c3de0',
    name: 'Sovyne Hnizdo',
    address:
      'Ferentsa Rakotsi St, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.Sites,
    accessibility: Accessibility.NonCompliant,
    featuresCount: 0,
    lat: 48.61,
    lng: 22.3,
  },
  {
    id: '035f4c6e-a878-474f-8606-5a8dc32c1382',
    name: 'White Hills Hotel spa & sport',
    address: 'Main ST 7, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.Hotels,
    accessibility: Accessibility.PartiallyCompliant,
    featuresCount: 0,
    lat: 48.627,
    lng: 22.29,
  },
]

export const features = [
  { id: '035f4c6e-a878-474f-8606-5a8dc32c1382', name: 'Automatic doors' },
  {
    id: '9d063120-eb4c-4b95-9385-81f76f8c3de0',
    name: 'Designated accessible parking spaces',
  },
  {
    id: 'cf6b9ca6-a5a7-436f-b714-8ea6e6822cd9',
    name: 'Elevators with Braille and auditory signals',
  },
  { id: '686ffb09-e15f-4673-af26-e29f91eba34c', name: 'Wheelchair ramps' },
]
