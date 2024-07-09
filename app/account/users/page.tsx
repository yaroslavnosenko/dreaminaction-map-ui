'use client'

import { gql, useQuery } from '@apollo/client'
import { Anchor, Autocomplete, Box, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { DStack } from '@/components/ui'
import { jql } from '@/utils'

import { useMe } from '@/hooks'
import { Query } from '@/types'

const query = gql(
  jql({
    query: {
      users: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    },
  })
)

export default function Users() {
  const me = useMe()
  const { data, loading } = useQuery<Query>(query)

  const users = data?.users || []

  if (loading) {
    return <>Loading</>
  }
  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Users</Title>
      </Group>
      <Autocomplete placeholder="Search" size="md" mb="2xl" />
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
