'use client'

import { Filter, Footer, Header, Map, MapContext } from '@/components/map'
import { places as _places } from '@/mocks'
import { Box, Flex, Stack } from '@mantine/core'

import classes from '@/app/(map)/layout.module.css'
import { FilterProvider } from '@/components/map/filter-context'

type MapLayoutProps = {
  children: React.ReactNode
}

export default function MapLayout({ children }: MapLayoutProps) {
  const places = _places

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
