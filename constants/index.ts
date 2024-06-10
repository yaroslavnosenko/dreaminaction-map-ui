import { Accessibility, Category } from '@/types'

export const AccessibilityColorMap = {
  [Accessibility.Compliant]: 'green',
  [Accessibility.PartiallyCompliant]: 'yellow',
  [Accessibility.NonCompliant]: 'red',
  [Accessibility.Unknown]: 'black',
}
export const FilterAccessibilityArray = [
  Accessibility.Compliant,
  Accessibility.PartiallyCompliant,
  Accessibility.NonCompliant,
]

export const AccessibilityArray = [
  ...FilterAccessibilityArray,
  Accessibility.Unknown,
]

export const CategoriesArray = [
  Category.Food,
  Category.Drinks,
  Category.Groceries,
  Category.Shopping,
  Category.Sites,
  Category.Hotels,
  Category.Health,
  Category.Transport,
]
