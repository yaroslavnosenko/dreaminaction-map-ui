import { Anchor, Box, Flex, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { DStack, SearchInput } from '@/components/ui'

import { getUsers } from '@/services'
import { User } from '@/types'
import { redirect } from 'next/navigation'
import { UserForm } from './form'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Users({ searchParams }: PageProps) {
  const users: User[] | number = await getUsers(searchParams['query'] as string)
  if (typeof users === 'number') {
    return redirect('/error')
  }
  const isAdmin = true

  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Users</Title>
      </Group>
      <SearchInput
        initValue={searchParams['query'] as string}
        charsCount={3}
        size="md"
        mb="2xl"
      />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="md">
        {users.map(({ id, firstName, lastName, email, role }) => (
          <Flex gap="md" wrap="wrap" key={id}>
            <Anchor component={Link} href={'#'} flex={1}>
              <Title order={4}>
                {firstName} {lastName}, <Text component="span">{email}</Text>
              </Title>
            </Anchor>
            <UserForm isAdmin={isAdmin} role={role} id={id} />
          </Flex>
        ))}
      </DStack>
      {users.length === 0 && <Text>List is empty</Text>}
    </Box>
  )
}
