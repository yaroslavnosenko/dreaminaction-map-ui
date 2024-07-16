import { AccessibilityArray } from '@/constants'
import { PlaceType } from '@/types'
import { Autocomplete, NativeSelect, Stack } from '@mantine/core'

type TabProps = {
  place?: PlaceType | null
}

export const SettingsTab = ({ place }: TabProps) => {
  console.log(place)
  return (
    <Stack gap="lg">
      <NativeSelect
        size="md"
        label="Accessibility"
        value={place?.accessibility}
        data={AccessibilityArray}
      />
      <Autocomplete size="md" label="Owner" value={place?.owner?.email} />
    </Stack>
  )
}
