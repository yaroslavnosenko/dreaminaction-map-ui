'use client'
import { useContext, useEffect } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Box, Group, Text, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { MapContext } from '@/components/map'
import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { Var, jql } from '@/utils'

import { init } from '@/configs'
import { DeepPartial, Place, Query, QueryPlacesByLocationArgs } from '@/types'

const placesQuery = gql(
  jql({
    query: {
      __variables: {
        input: 'LocationInput!',
      },
      placesByLocation: {
        __args: {
          input: new Var('input'),
        },
        id: true,
        name: true,
        address: true,
        accessibility: true,
        category: true,
        featuresCount: true,
        lat: true,
        lng: true,
      },
    },
  })
)

export default function MapListPage() {
  const { places, setPlaces, initMapPosition, setInitMapPosition } =
    useContext(MapContext)
  const router = useRouter()
  const onClick = (place: DeepPartial<Place>) => router.push('/' + place.id)

  const { data, loading } = useQuery<Query, QueryPlacesByLocationArgs>(
    placesQuery,
    {
      variables: { input: { swLat: 0, swLng: 0, neLat: 0, neLng: 0 } },
      skip: false,
    }
  )

  useEffect(() => {
    if (!initMapPosition) {
      setInitMapPosition({ lat: init.lat, lng: init.lng })
    }
  }, [initMapPosition, setInitMapPosition])

  useEffect(() => {
    if (data?.placesByLocation) {
      setPlaces(data.placesByLocation)
    }
  }, [data, setPlaces])

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
