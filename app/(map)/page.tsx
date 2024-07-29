import { Map } from '@/components/map'
import { Box, Center, Group, Loader, Title } from '@mantine/core'

import { getPlacesByBounce } from '@/services'

import { PlaceList } from '@/components/place'
import { parseBoundsFromSearchParams } from '@/utils'
import classes from './layout.module.css'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MapListPage({ searchParams }: PageProps) {
  const bounds = parseBoundsFromSearchParams(searchParams)
  const places = bounds ? await getPlacesByBounce() : null

  return (
    <>
      <Box component="main" className={classes['main']}>
        {!places && (
          <Center h="100%">
            <Loader />
          </Center>
        )}
        {places && (
          <>
            <Group h={56} mb="2xl" justify="space-between">
              <Title order={2}>New York</Title>
              <Title opacity={0.7} order={2} fw="normal">
                {places.length}
              </Title>
            </Group>
            <PlaceList places={places || []} partHref="/" />
          </>
        )}
      </Box>
      <Box component="aside" className={classes['map']}>
        <Map places={places || []} bounds={bounds} />
      </Box>
    </>
  )
}
