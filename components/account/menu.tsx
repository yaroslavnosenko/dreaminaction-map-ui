import { Anchor, Divider, Stack, Title } from '@mantine/core'
import Link from 'next/link'

type MenuProps = {
  isAdmin: boolean
}

export const Menu = ({ isAdmin }: MenuProps) => {
  return (
    <Stack mt="2xl" gap="md">
      <Anchor component={Link} href="/account/places">
        <Title order={4}>Places</Title>
      </Anchor>
      <Anchor component={Link} href="/account/features">
        <Title order={4}>Features</Title>
      </Anchor>
      {isAdmin && (
        <>
          <Divider my="xl" />
          <Anchor component={Link} href="/account/users">
            <Title order={4}>Users</Title>
          </Anchor>
        </>
      )}
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
