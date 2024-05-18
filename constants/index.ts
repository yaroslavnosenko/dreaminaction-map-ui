import { PlaceAccessibility } from '@/types'

export const AccessibilityLabelMap = {
  [PlaceAccessibility.compliant]: 'Compliant',
  [PlaceAccessibility.non_compliant]: 'Non Compliant',
  [PlaceAccessibility.partially_compliant]: 'Partially',
  [PlaceAccessibility.unknown]: 'Unknown',
}

export const AccessibilityColorMap = {
  [PlaceAccessibility.compliant]: 'green',
  [PlaceAccessibility.partially_compliant]: 'yellow',
  [PlaceAccessibility.non_compliant]: 'red',
  [PlaceAccessibility.unknown]: 'black',
}
