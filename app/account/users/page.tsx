'use client'
import { useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Anchor, Box, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { DStack, SearchInput } from '@/components/ui'
import { Var, jql } from '@/utils'

import { Query, QueryUsersArgs } from '@/types'

const query = gql(
  jql({
    query: {
      __variables: {
        query: 'String',
      },
      users: {
        __args: {
          query: new Var('query'),
        },
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    },
  })
)

export default function Users() {
  const [searchQuery, setQuery] = useState<string>('')
  const { data, loading } = useQuery<Query, QueryUsersArgs>(query, {
    variables: { query: searchQuery },
  })

  const users = data?.users || []

  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Users</Title>
      </Group>
      <SearchInput charsCount={3} onQueryChange={setQuery} size="md" mb="2xl" />
      {loading && 'Loading'}
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
