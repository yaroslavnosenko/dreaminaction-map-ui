import { Anchor, Box, Button, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'

import { DStack } from '@/components/ui'
import { me } from '@/services/auth'
import { getFeatures } from '@/services/feature'
import { UserRole } from '@/types'

export default async function Features() {
  const user = await me()
  const isAdmin = user?.role === UserRole.admin
  const features = await getFeatures()

  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Features</Title>
        {isAdmin && (
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
        )}
      </Group>
      <Title fw="normal" order={4} opacity={0.7}>
        {features.length} items
      </Title>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="md">
        {features.map(({ id, name }) => (
          <Anchor
            component={Link}
            key={id}
            href={isAdmin ? '/account/features/' + id : '#'}
          >
            <Title order={4}>{name}</Title>
          </Anchor>
        ))}
      </DStack>
      {features.length === 0 && <Text>List is empty</Text>}
    </Box>
  )
}
