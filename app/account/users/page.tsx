import { Anchor, Box, Divider, Flex, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { DStack } from '@/components/ui'

import { t } from '@/i18n'
import { me } from '@/services/auth'
import { getUsers } from '@/services/user'
import { User, UserRole } from '@/types'
import { redirect } from 'next/navigation'
import { CreateForm } from './create-form'
import { UserForm } from './form'

export default async function Users() {
  const user = await me()
  if (!user || user.role !== UserRole.admin) {
    return redirect('/auth/logout')
  }
  const users: User[] | number = await getUsers()
  if (typeof users === 'number') {
    return redirect('/auth/logout')
  }
  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>{t('labels.users')}</Title>
      </Group>
      <CreateForm />
      <Divider mt="xl" />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} mt="xl" gap="md">
        {users.map(({ id, email, role }) => (
          <Flex gap="md" wrap="wrap" key={id}>
            <Anchor component={Link} href={'#'} flex={1}>
              <Title order={4}>{email}</Title>
            </Anchor>
            <UserForm role={role} id={id} />
          </Flex>
        ))}
      </DStack>
      {users.length === 0 && <Text>{t('labels.empty-list')}</Text>}
    </Box>
  )
}
