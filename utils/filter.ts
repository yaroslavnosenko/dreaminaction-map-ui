import { Accessibility, Category, PlaceType } from '@/types'

export const filterPlaces = (
  places: PlaceType[],
  categories: Category[],
  accessibilities: Accessibility[]
) => {
  return places
    .filter((place) => accessibilities.includes(place.accessibility!))
    .filter((place) => categories.includes(place.category!))
}
