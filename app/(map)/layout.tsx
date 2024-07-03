'use client'

import { PropsWithChildren, useState } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Box, Flex, Stack } from '@mantine/core'

import { Filter, Footer, Header, Map, MapContext } from '@/components/map'
import { FilterProvider } from '@/components/map/filter-context'
import { client } from '@/graphql'

import { PlaceType } from '@/types'
import classes from './layout.module.css'

export default function MapLayout({ children }: PropsWithChildren) {
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [activePlace, setActivePlace] = useState<PlaceType | null>(null)
  const [initMapPosition, setInitMapPosition] = useState<{
    lat: number
    lng: number
  } | null>(null)

  return (
    <ApolloProvider client={client()}>
      <MapContext.Provider
        value={{
          places,
          setPlaces,
          initMapPosition,
          setInitMapPosition,
          activePlace,
          setActivePlace,
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
    </ApolloProvider>
  )
}
