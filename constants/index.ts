import { Accessibility, Category } from '@/services/types'

export const AccessibilityColorMap = {
  [Accessibility.compliant]: 'green',
  [Accessibility.partially_compliant]: 'yellow',
  [Accessibility.non_compliant]: 'red',
  [Accessibility.unknown]: 'black',
}

export const AccessibilityLabelMap = {
  [Accessibility.compliant]: 'Compliant',
  [Accessibility.partially_compliant]: 'Partially',
  [Accessibility.non_compliant]: 'Non Compliant',
  [Accessibility.unknown]: 'Unknown',
}

export const FilterAccessibilityArray = [
  Accessibility.compliant,
  Accessibility.partially_compliant,
  Accessibility.non_compliant,
]

export const AccessibilityArray = [
  ...FilterAccessibilityArray,
  Accessibility.unknown,
]

export const CategoriesArray = [
  Category.food,
  Category.drinks,
  Category.groceries,
  Category.shopping,
  Category.sites,
  Category.hotels,
  Category.health,
  Category.transport,
]

export enum StorageKeys {
  Auth = 'auth-token',
  FilterCategories = 'filter-categories',
  FilterAccessibilities = 'filter-accessibilities',
}
