'use client'

import { PropsWithChildren } from 'react'

import { Box, Flex, Stack } from '@mantine/core'

import { Filter, Footer, Header, Map } from '@/components/map'
import { MapContext, MapPrivider } from '@/components/map/map-context'
import classes from './layout.module.css'

export default function MapLayout({ children }: PropsWithChildren) {
  return (
    <MapPrivider>
      <Flex className={classes['layout']}>
        <Stack gap={0} component="nav" className={classes['sidebar']}>
          <Header />
          <Filter flex={1} />
          <Footer visibleFrom="xs" />
        </Stack>
        {children}
        <Box component="aside" className={classes['map']}>
          <Map />
        </Box>
      </Flex>
    </MapPrivider>
  )
}
