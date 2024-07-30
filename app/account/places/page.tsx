import { Box, Button, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'

import { PlaceList } from '@/components/place'
import { getMyPlaces } from '@/services'

export default async function Places() {
  const places = await getMyPlaces()

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
        {places.length} items
      </Title>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <PlaceList places={places || []} partHref="/" />
    </Box>
  )
}
