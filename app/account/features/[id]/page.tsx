'use client'

import { features } from '@/mocks'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MdArrowBack, MdDelete } from 'react-icons/md'

export default function SaveFeature() {
  const { id } = useParams()
  const feature = features.find((feat) => feat.id === id)
  console.log(feature)
  return (
    <Box>
      <Group h={56} mb="2xl">
        <ActionIcon
          component={Link}
          size="lg"
          radius="xl"
          href="/account/features"
          className="animated"
        >
          <MdArrowBack size={24} />
        </ActionIcon>
        <Title order={2}>Edit Feature</Title>
      </Group>
      <Stack gap="lg">
        <TextInput
          value={feature?.name}
          required
          size="md"
          label="Name"
          placeholder="Name"
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
          size="md"
          radius="xl"
          leftSection={<MdDelete size={24} />}
          className="animated"
          variant="white"
          color="red"
        >
          Delete
        </Button>
      </Group>
    </Box>
  )
}
