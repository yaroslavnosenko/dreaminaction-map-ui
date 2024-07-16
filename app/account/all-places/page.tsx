'use client'
import { useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Box, Checkbox, Flex, Group, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { renderList } from '@/components/place'
import { DStack, SearchInput } from '@/components/ui'
import { AccessibilityArray, AccessibilityColorMap } from '@/constants'
import { Var, jql } from '@/utils'

import { Accessibility, PlaceType, Query, QueryPlacesArgs } from '@/types'

const query = gql(
  jql({
    query: {
      __variables: {
        query: 'String',
        accessibilities: '[Accessibility!]',
      },
      places: {
        __args: {
          query: new Var('query'),
          accessibilities: new Var('accessibilities'),
        },
        id: true,
        name: true,
        address: true,
        accessibility: true,
        category: true,
      },
    },
  })
)

export default function AllPlaces() {
  const router = useRouter()

  const [searchQuery, setQuery] = useState<string>('')
  const [accessibilities, setAccessibilities] =
    useState<Accessibility[]>(AccessibilityArray)

  const { data, loading } = useQuery<Query, QueryPlacesArgs>(query, {
    variables: { query: searchQuery, accessibilities },
  })

  const toggleAccessibility = (accessibility: Accessibility) =>
    setAccessibilities(
      accessibilities.includes(accessibility)
        ? [...accessibilities.filter((acc) => acc !== accessibility)]
        : [...accessibilities, accessibility]
    )

  const places = data?.places || []

  const onClick = (place: PlaceType) =>
    router.push('/account/places/' + place.id)

  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>Places</Title>
      </Group>
      <SearchInput charsCount={3} onQueryChange={setQuery} size="md" mb="xl" />
      <Flex gap="lg" wrap="wrap">
        {AccessibilityArray.map((accessibility) => (
          <Checkbox
            radius="xl"
            checked={accessibilities.includes(accessibility)}
            onChange={() => toggleAccessibility(accessibility)}
            color={AccessibilityColorMap[accessibility]}
            key={accessibility}
            size="md"
            label={accessibility}
          />
        ))}
      </Flex>
      <Box h={1} bg="#f1f1f1" my="xl" />
      {loading && 'Loading'}
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
        {renderList(places, onClick)}
      </DStack>
    </Box>
  )
}
