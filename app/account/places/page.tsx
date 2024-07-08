'use client'

import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { useMe } from '@/hooks'
import { places as _places } from '@/mocks'
import { DeepPartial, Place } from '@/types'
import { Box, Button, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdAdd } from 'react-icons/md'

export default function Places() {
  const me = useMe()
  const places = _places
  const router = useRouter()

  const onClick = (place: DeepPartial<Place>) =>
    router.push('/account/places/' + place.id)

  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>My Places</Title>
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
