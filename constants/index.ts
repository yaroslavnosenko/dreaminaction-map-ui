import { Accessibility } from '@/types'

export const AccessibilityLabelMap = {
  [Accessibility.Compliant]: 'Compliant',
  [Accessibility.NonCompliant]: 'Non Compliant',
  [Accessibility.PartiallyCompliant]: 'Partially',
  [Accessibility.Unknown]: 'Unknown',
}

export const AccessibilityColorMap = {
  [Accessibility.Compliant]: 'green',
  [Accessibility.PartiallyCompliant]: 'yellow',
  [Accessibility.NonCompliant]: 'red',
  [Accessibility.Unknown]: 'black',
}
