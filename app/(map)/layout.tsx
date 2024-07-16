'use client'
import { PropsWithChildren, useEffect } from 'react'

import { Box, Flex, Stack } from '@mantine/core'
import { LngLat } from 'mapbox-gl'
import { useParams, useRouter } from 'next/navigation'

import {
  Filter,
  FilterProvider,
  Footer,
  Header,
  Map,
  MapProvider,
  useMap,
} from '@/components/map'

import { Uzhhorod } from '@/configs'
import { client } from '@/graphql'
import { Query, QueryPlaceArgs, QueryPlacesByBoundsArgs } from '@/types'

import { placeByIdQuery, placesByBoundsQuery } from './graphql'
import classes from './layout.module.css'

const BaseLayout = ({ children }: PropsWithChildren) => {
  const { id: activePlaceId } = useParams()
  const router = useRouter()
  const {
    setPlaces,
    setActivePlace,
    initMapPosition,
    bounds,
    setInitMapPosition,
  } = useMap()

  useEffect(() => {
    if (activePlaceId) {
      client
        .query<Query, QueryPlaceArgs>({
          query: placeByIdQuery,
          variables: { id: activePlaceId as string },
        })
        .then(({ data: { place } }) => {
          if (!place) {
            router.push('/')
            return
          }
          if (!initMapPosition) {
            setInitMapPosition(new LngLat(place.lng, place.lat))
          }
          setActivePlace(place)
        })
    } else {
      setInitMapPosition(Uzhhorod)
    }
  }, [
    activePlaceId,
    initMapPosition,
    router,
    setActivePlace,
    setInitMapPosition,
  ])

  useEffect(() => {
    if (!bounds) return
    const { swLat, swLng, neLat, neLng } = bounds
    client
      .query<Query, QueryPlacesByBoundsArgs>({
        query: placesByBoundsQuery,
        variables: { input: { swLat, swLng, neLat, neLng } },
      })
      .then(({ data: { placesByBounds } }) => {
        if (!placesByBounds) return
        setPlaces(placesByBounds)
      })
  }, [bounds, setPlaces])

  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header />
        <Filter flex={1} />
        <Footer visibleFrom="xs" />
      </Stack>
      <Box component="main" className={classes['main']}>
        {children}
      </Box>
      <Box component="aside" className={classes['map']}>
        <Map />
      </Box>
    </Flex>
  )
}

export default function MapLayout({ children }: PropsWithChildren) {
  return (
    <MapProvider>
      <FilterProvider>
        <BaseLayout>{children}</BaseLayout>
      </FilterProvider>
    </MapProvider>
  )
}
