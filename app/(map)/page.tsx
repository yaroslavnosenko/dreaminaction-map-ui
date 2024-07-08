'use client'
import { useContext, useEffect, useMemo } from 'react'

import { Box, Group, Text, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { FilterContext, MapContext } from '@/components/map'
import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'

import { DeepPartial, Place } from '@/types'
import { filterPlaces } from '@/utils'

export default function MapListPage() {
  const { places, setActivePlace } = useContext(MapContext)
  const { categories, accessibilities } = useContext(FilterContext)
  const router = useRouter()
  const onClick = (place: DeepPartial<Place>) => router.push('/' + place.id)
  const filteredPlaces = useMemo(
    () => filterPlaces(places || [], categories, accessibilities),
    [places, categories, accessibilities]
  )

  useEffect(() => {
    setActivePlace(null)
  }, [setActivePlace])

  if (!places) {
    return <>Loading</>
  }

  return (
    <>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Uzhhorod</Title>
        <Title opacity={0.7} order={2} fw="normal">
          {filteredPlaces.length}
        </Title>
      </Group>
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
        {renderList(filteredPlaces, onClick)}
      </DStack>
      <Text opacity={0.7} pt="2xl">
        End of the List
      </Text>
    </>
  )
}
