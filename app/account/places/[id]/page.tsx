'use client'

import { places } from '@/mocks'
import { Accessibility } from '@/types'
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Group,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MdArrowBack, MdOpenInNew } from 'react-icons/md'

export default function SavePlace() {
  const { id } = useParams()
  const place = places.find((place) => place.id === id)
  console.log(place)
  return (
    <Box>
      <Group h={56} mb="2xl">
        <ActionIcon
          component={Link}
          size="lg"
          radius="xl"
          href="/account/places"
          className="animated"
        >
          <MdArrowBack size={24} />
        </ActionIcon>
        <Title order={2}>Edit Place</Title>
      </Group>
      <Stack gap="lg">
        <TextInput
          value={place?.name}
          required
          size="md"
          label="Name"
          placeholder="Name"
        />
        <Autocomplete
          value={place?.address}
          required
          size="md"
          label="Address"
          placeholder="Address"
        />
        <Textarea
          value={place?.description || ''}
          size="md"
          label="Description"
          placeholder="Description"
          autosize
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button
          component={Link}
          size="md"
          radius="xl"
          href={'/places/' + id}
          className="animated"
        >
          Save
        </Button>
        <Button
          component={Link}
          size="md"
          radius="xl"
          leftSection={<MdOpenInNew size={24} />}
          href={'/' + id}
          className="animated"
          variant="white"
          target="_blank"
        >
          Visit
        </Button>
      </Group>

      {/* Admin zone */}
      <Box h={2} bg="red" mt="xl" />
      <Title order={2} mt="xs" mb="md" c="red">
        Admin Zone
      </Title>
      <Stack gap="lg">
        <NativeSelect
          disabled
          size="md"
          label="Owner"
          data={['admin@mock.loc', 'manager@mock.loc', 'user@mock.loc']}
        />
        <NativeSelect
          size="md"
          label="Accessibility"
          data={[Accessibility.Compliant]}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" mt="xl" />
      {/* Admin zone */}
    </Box>
  )
}
