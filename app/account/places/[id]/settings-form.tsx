import { Place } from '@/types'
import { Autocomplete, NativeSelect, Stack } from '@mantine/core'

type FormProps = {
  place: Place
  isAdmin: boolean
}

export const SettingsForm = ({ place, isAdmin }: FormProps) => {
  console.log(place)
  return (
    <Stack gap="lg">
      <NativeSelect
        size="md"
        label="Accessibility"
        value={place?.accessibility}
      />
      <Autocomplete
        size="md"
        label="Owner"
        value={place?.owner?.email}
        disabled={isAdmin}
      />
    </Stack>
  )
}
