'use client'
import { gql, useQuery } from '@apollo/client'
import { Box, Button, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdAdd } from 'react-icons/md'

import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { useMe } from '@/hooks'
import { Var, jql } from '@/utils'

import { DeepPartial, Place, Query, QueryUserArgs } from '@/types'

const query = gql(
  jql({
    query: {
      __variables: {
        id: 'ID!',
      },
      user: {
        __args: {
          id: new Var('id'),
        },
        places: {
          id: true,
          name: true,
          address: true,
          accessibility: true,
          category: true,
        },
      },
    },
  })
)

export default function Places() {
  const me = useMe()
  const router = useRouter()
  const { data, loading } = useQuery<Query, QueryUserArgs>(query, {
    variables: { id: me?.id || '' },
    skip: !me,
  })
  const places = data?.user?.places || []

  const onClick = (place: DeepPartial<Place>) =>
    router.push('/account/places/' + place.id)

  return (
    <Box>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>My Places</Title>
        <Button
          component={Link}
          size="md"
          radius="xl"
          leftSection={<MdAdd size={24} />}
          href="/account/places/new"
          className="animated"
        >
          New
        </Button>
      </Group>
      <Title fw="normal" order={4} opacity={0.7}>
        {places.length} items
      </Title>
      <Box h={1} bg="#f1f1f1" my="xl" />
      {loading && 'Loading'}
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
        {renderList(places, onClick)}
      </DStack>
    </Box>
  )
}
