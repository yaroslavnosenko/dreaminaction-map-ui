'use client'

import { MapContext } from '@/components/map'
import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { DeepPartial, Place } from '@/types'
import { Box, Group, Text, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function MapListPage() {
  const { places } = useContext(MapContext)
  const router = useRouter()
  const onClick = (place: DeepPartial<Place>) => router.push('/' + place.id)

  return (
    <>
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>Uzhhorod</Title>
        <Title opacity={0.7} order={2} fw="normal">
          6
        </Title>
      </Group>
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
        {renderList(places, onClick)}
      </DStack>
      <Text opacity={0.7} pt="2xl">
        End of the List
      </Text>
    </>
  )
}
