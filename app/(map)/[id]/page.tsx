import { Box, Button, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import {
  MdAccessibleForward,
  MdOutlineCheck,
  MdOutlineClose,
  MdOutlineDirections,
} from 'react-icons/md'
import classes from '../layout.module.css'

import { ContextResolver } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { BackButton } from '@/components/ui'

import { AccessibilityColorMap, AccessibilityLabelMap } from '@/constants'
import { getMapPlaces, getPlaceById } from '@/services/place'
import { Accessibility, Category } from '@/types'
import { redirect } from 'next/navigation'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MapPage({
  params: { id },
  searchParams,
}: PageProps) {
  const place = await getPlaceById(id)
  if (typeof place === 'number') {
    redirect('/')
  }

  const searchCat = searchParams['categories'] as string | undefined
  const categories: Category[] | undefined = !searchCat
    ? undefined
    : (searchCat.split(',') as Category[])

  const searchAcc = searchParams['accessibilities'] as string | undefined
  const accessibilities: Accessibility[] | undefined = !searchAcc
    ? undefined
    : (searchAcc.split(',').map((acc) => parseInt(acc, 10)) as Accessibility[])

  let places = await getMapPlaces(categories, accessibilities)

  return (
    <Box component="main" className={classes['main']}>
      <ContextResolver places={places} />
      <Group h={56} mb="2xl" justify="space-between">
        <BackButton />
        <Button
          className="animated"
          component={Link}
          color="black"
          variant="filled"
          radius="xl"
          size="md"
          href={
            'https://www.google.com/maps/dir//' + place.lat + ',' + place.lng
          }
          target="_blank"
          rightSection={<MdOutlineDirections size={24} />}
        >
          Directions
        </Button>
      </Group>
      <Group gap="sm">
        <PlaceIcon category={place!.category} />
        <Title order={3} fw={500}>
          {place!.name}
        </Title>
      </Group>
      <Text opacity={0.7} my="md">
        {place!.address}
      </Text>
      <Group gap="sm">
        <Box
          w={40}
          h={40}
          p={8}
          c="white"
          bg={AccessibilityColorMap[place.accessibility]}
          style={{ borderRadius: 10000 }}
        >
          <MdAccessibleForward size={24} />
        </Box>
        <Text>{AccessibilityLabelMap[place.accessibility]}</Text>
      </Group>
      {place.description && (
        <>
          <Box my="lg" h={1} bg="#f1f1f1" />
          <Text opacity={0.7} my="md">
            {place.description}
          </Text>
        </>
      )}
      <Box my="lg" h={1} bg="#f1f1f1" />
      {place.availableFeatures && place.unavailableFeatures && (
        <>
          <Title order={4} fw={500}>
            Features
          </Title>
          <Box my="lg" h={1} bg="#f1f1f1" />
          {place.availableFeatures.map(({ id, name }) => (
            <Group key={id}>
              <MdOutlineCheck color="green" size={24} />
              <Text mt="xs">{name}</Text>
            </Group>
          ))}
          {place.unavailableFeatures.map(({ id, name }) => (
            <Group align="center" key={id}>
              <MdOutlineClose color="red" size={24} />
              <Text mt="xs">{name}</Text>
            </Group>
          ))}
        </>
      )}
      {place.availableFeatures?.length === 0 &&
        place.unavailableFeatures?.length === 0 && (
          <Text>No features to show</Text>
        )}
    </Box>
  )
}
