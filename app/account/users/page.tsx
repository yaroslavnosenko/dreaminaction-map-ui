import { Anchor, Box, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { DStack, SearchInput } from '@/components/ui'

import { getUsers } from '@/services'
import { UserRepsonse } from '@/services/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Users({ searchParams }: PageProps) {
  const token = cookies().get('auth-token')!.value
  const users: UserRepsonse[] | number = await getUsers(
    token,
    searchParams['query'] as string
  )

  if (typeof users === 'number') {
    return redirect('/auth/logout')
  }

  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Users</Title>
      </Group>
      <SearchInput
        initValue={(searchParams['query'] as string) || ''}
        charsCount={3}
        size="md"
        mb="2xl"
      />
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="md">
        {users.map(({ id, firstName, lastName, email }) => (
          <Anchor component={Link} key={id} href={'#'}>
            <Title order={4}>
              {firstName} {lastName}, <Text component="span">{email}</Text>
            </Title>
          </Anchor>
        ))}
      </DStack>
    </Box>
  )
}
