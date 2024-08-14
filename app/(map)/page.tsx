import { Box, Group, Text, Title } from '@mantine/core'

import { getMapPlaces } from '@/services/place'

import { ContextResolver } from '@/components/map'
import { PlaceList } from '@/components/place'
import { Accessibility, Category } from '@/types'
import classes from './layout.module.css'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MapListPage({ searchParams }: PageProps) {
  const searchCat = searchParams['categories'] as string | undefined
  const categories: Category[] | undefined = !searchCat
    ? undefined
    : (searchCat.split(',') as Category[])

  const searchAcc = searchParams['accessibilities'] as string | undefined
  const accessibilities: Accessibility[] | undefined = !searchAcc
    ? undefined
    : (searchAcc.split(',').map((acc) => parseInt(acc, 10)) as Accessibility[])

  const places = await getMapPlaces(categories, accessibilities)

  return (
    <Box component="main" className={classes['main']}>
      <ContextResolver places={places} />
      <Group h={56} mb="2xl" justify="space-between">
        <Title order={2}>New York</Title>
        <Title opacity={0.7} order={2} fw="normal">
          {places.length}
        </Title>
      </Group>
      <PlaceList places={places || []} partHref="/" />
      {places.length === 0 && <Text>No places to show</Text>}
    </Box>
  )
}
