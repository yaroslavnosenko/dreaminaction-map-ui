'use client'

import { PropsWithChildren } from 'react'

import { Filter, Footer, Header, Map, MapContext } from '@/components/map'
import { places as _places } from '@/mocks'
import { Box, Flex, Stack } from '@mantine/core'

import { FilterProvider } from '@/components/map/filter-context'
import { DeepPartial, Place } from '@/types'
import classes from './layout.module.css'

export default function MapLayout({ children }: PropsWithChildren) {
  const places: DeepPartial<Place>[] = _places

  return (
    <MapContext.Provider value={{ places }}>
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
            <Map places={places} />
          </Box>
        </Flex>
      </FilterProvider>
    </MapContext.Provider>
  )
}
