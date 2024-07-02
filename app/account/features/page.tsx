import { DStack } from '@/components/ui'
import { features } from '@/mocks'
import { ActionIcon, Box, Button, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdAdd, MdEdit } from 'react-icons/md'

export default function Features() {
  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Features</Title>
        <Button
          component={Link}
          size="md"
          radius="xl"
          leftSection={<MdAdd size={24} />}
          href="/account/features/new"
          className="animated"
        >
          New
        </Button>
      </Group>
      <Title fw="normal" order={4} opacity={0.7}>
        10 items
      </Title>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="sm">
        {features.map(({ id, name }) => (
          <Group
            mih={48}
            gap={0}
            key={id}
            justify="space-between"
            wrap="nowrap"
          >
            <Box flex="1">{name}</Box>
            <ActionIcon
              href={'/account/features/' + id}
              component={Link}
              variant="white"
              size="xl"
            >
              <MdEdit size={24} />
            </ActionIcon>
          </Group>
        ))}
      </DStack>
    </Box>
  )
}
