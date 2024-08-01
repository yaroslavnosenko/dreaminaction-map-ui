import { Box, Checkbox, Flex, Group, Title } from '@mantine/core'

import { PlaceList } from '@/components/place'
import { SearchInput } from '@/components/ui'
import {
  AccessibilityArray,
  AccessibilityColorMap,
  AccessibilityLabelMap,
} from '@/constants'
import { getPlaces } from '@/services'
import { Accessibility } from '@/types'
import { redirect } from 'next/navigation'

export default async function AllPlaces() {
  const accessibilities: Accessibility[] = []
  const places = await getPlaces(accessibilities)
  if (typeof places === 'number') {
    return redirect('/auth/logout')
  }

  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Places</Title>
      </Group>
      <SearchInput charsCount={3} size="md" mb="xl" />
      <Flex gap="lg" wrap="wrap">
        {AccessibilityArray.map((accessibility) => (
          <Checkbox
            radius="xl"
            checked={accessibilities.includes(accessibility)}
            color={AccessibilityColorMap[accessibility]}
            key={accessibility}
            size="md"
            label={AccessibilityLabelMap[accessibility]}
          />
        ))}
      </Flex>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <PlaceList places={places} partHref="/account/places/" />
    </Box>
  )
}
