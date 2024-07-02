import { Anchor, Divider, Stack, Title } from '@mantine/core'
import Link from 'next/link'

export const Menu = () => {
  return (
    <Stack mt="2xl" gap="md">
      <Anchor component={Link} href="/account/places">
        <Title order={4}>Places</Title>
      </Anchor>
      <Anchor component={Link} href="/account/features">
        <Title order={4}>Features</Title>
      </Anchor>
      <Divider my="xl" />
      <Anchor component={Link} href="/account/all-places">
        <Title order={4}>All Places</Title>
      </Anchor>
      <Divider my="xl" />
      <Anchor component={Link} href="/">
        <Title order={4}>Back to Map</Title>
      </Anchor>
      <Anchor component={Link} href="/auth/logout">
        <Title c="red" order={4}>
          Logout
        </Title>
      </Anchor>
    </Stack>
  )
}
