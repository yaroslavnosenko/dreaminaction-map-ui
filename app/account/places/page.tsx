import { Box, Button, Checkbox, Flex, Group, Title } from '@mantine/core'

import { PlaceList } from '@/components/place'
import { SearchInput } from '@/components/ui'
import {
  AccessibilityArray,
  AccessibilityColorMap,
  AccessibilityLabelMap,
} from '@/constants'
import { getPlaces } from '@/services/place'
import { Accessibility } from '@/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MdAdd } from 'react-icons/md'

export default async function Places() {
  const accessibilities: Accessibility[] = []
  const places = await getPlaces(accessibilities)
  if (typeof places === 'number') {
    redirect('/auth/logout')
  }
  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Places</Title>
        <Button
          component={Link}
          size="md"
          radius="xl"
          leftSection={<MdAdd size={24} />}
          href="/account/places/new"
          className="animated"
        >
          New
        </Button>
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
