'use client'

import { PropsWithChildren, Suspense } from 'react'

import { Box, Flex, Stack } from '@mantine/core'

import { Filter, Footer, Header, Map } from '@/components/map'
import { MapPrivider } from '@/components/map/map-context'
import classes from './layout.module.css'

export default function MapLayout({ children }: PropsWithChildren) {
  return (
    <MapPrivider>
      <Flex className={classes['layout']}>
        <Stack gap={0} component="nav" className={classes['sidebar']}>
          <Suspense>
            <Header />
            <Filter flex={1} />
            <Footer visibleFrom="xs" />
          </Suspense>
        </Stack>
        {children}
        <Box component="aside" className={classes['map']}>
          <Map />
        </Box>
      </Flex>
    </MapPrivider>
  )
}
