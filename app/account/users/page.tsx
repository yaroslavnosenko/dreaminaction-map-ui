'use client'

import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { places as _places } from '@/mocks'
import { DeepPartial, Place } from '@/types'
import { Box, Group, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

export default function Users() {
  const places = _places
  const router = useRouter()
  const onClick = (place: DeepPartial<Place>) =>
    router.push('/account/places/' + place.id)
  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Users</Title>
      </Group>
      <Title fw="normal" order={4} opacity={0.7}>
        10 items
      </Title>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
        {renderList(places, onClick)}
      </DStack>
    </Box>
  )
}
