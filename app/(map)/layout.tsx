'use client'
import { PropsWithChildren, useEffect, useState } from 'react'

import { Box, Flex, Stack } from '@mantine/core'
import { LngLatBounds, LngLatLike } from 'mapbox-gl'
import { useParams, useRouter } from 'next/navigation'

import {
  Filter,
  FilterProvider,
  Footer,
  Header,
  Map,
  MapContext,
} from '@/components/map'

import { Uzhhorod } from '@/configs'
import { client } from '@/graphql'
import {
  PlaceType,
  Query,
  QueryPlaceArgs,
  QueryPlacesByBoundsArgs,
} from '@/types'
import { placeByIdQuery, placesByBoundsQuery } from './graphql'
import classes from './layout.module.css'

export default function MapLayout({ children }: PropsWithChildren) {
  const { id: activePlaceId } = useParams()
  const router = useRouter()
  const [places, setPlaces] = useState<PlaceType[] | null>(null)
  const [activePlace, setActivePlace] = useState<PlaceType | null>(null)
  const [bounds, setBounds] = useState<LngLatBounds | null>(null)
  const [initMapPosition, setInitMapPosition] = useState<LngLatLike | null>(
    null
  )

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
            setInitMapPosition({ lat: place.lat, lng: place.lng })
          }
          setActivePlace(place)
        })
    } else {
      setInitMapPosition(Uzhhorod)
    }
  }, [activePlaceId, initMapPosition, router])

  useEffect(() => {
    if (!bounds) return
    client
      .query<Query, QueryPlacesByBoundsArgs>({
        query: placesByBoundsQuery,
        variables: {
          input: {
            swLat: bounds._sw.lat,
            swLng: bounds._sw.lng,
            neLat: bounds._ne.lat,
            neLng: bounds._ne.lng,
          },
        },
      })
      .then(({ data: { placesByBounds } }) => {
        if (!placesByBounds) return
        setPlaces(placesByBounds)
      })
  }, [bounds])

  return (
    <MapContext.Provider
      value={{
        places,
        setPlaces,
        initMapPosition,
        setInitMapPosition,
        activePlace,
        setActivePlace,
        bounds,
        setBounds,
      }}
    >
      <FilterProvider>
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
      </FilterProvider>
    </MapContext.Provider>
  )
}
