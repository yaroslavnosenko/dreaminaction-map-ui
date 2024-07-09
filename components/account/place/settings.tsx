import { Accessibility, PlaceType } from '@/types'
import { NativeSelect, Stack } from '@mantine/core'

type TabProps = {
  place?: PlaceType
}

export const SettingsTab = ({ place }: TabProps) => {
  return (
    <Stack gap="lg">
      <NativeSelect
        size="md"
        label="Accessibility"
        data={[Accessibility.Compliant]}
      />
      <NativeSelect
        disabled
        size="md"
        label="Owner"
        data={['admin@mock.loc', 'manager@mock.loc', 'user@mock.loc']}
      />
    </Stack>
  )
}
