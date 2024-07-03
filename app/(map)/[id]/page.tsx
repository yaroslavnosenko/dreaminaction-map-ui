'use client'
import { MapContext } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { AccessibilityColorMap } from '@/constants'
import { Accessibility, Category } from '@/types'
import { Box, Button, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import {
  MdAccessibleForward,
  MdOutlineArrowBack,
  MdOutlineDirections,
} from 'react-icons/md'

export default function MapPage() {
  const { setActivePlace, setInitMapPosition, setPlaces, places } =
    useContext(MapContext)
  const router = useRouter()
  const { id } = useParams()
  const place = places.find((place) => place.id === id)
  const accessibility = place?.accessibility || Accessibility.Unknown

  useEffect(() => {
    window.scrollTo(0, 0)
    if (place) {
      setActivePlace(place)
      setInitMapPosition({ lat: place.lat!, lng: place.lng! })
      // setPlaces([...places.filter((item) => item.id !== place.id), place])
    }
  }, [place, places, setActivePlace, setInitMapPosition, setPlaces])

  return (
    <>
      <Group h={56} mb="2xl" justify="space-between">
        <Button
          onClick={() => router.push('/')}
          color="black"
          variant="transparent"
          radius="xl"
          size="md"
          p={0}
          leftSection={<MdOutlineArrowBack size={24} />}
        >
          Back
        </Button>
        <Button
          className="animated"
          component={Link}
          color="black"
          variant="filled"
          radius="xl"
          size="md"
          href="/auth"
          rightSection={<MdOutlineDirections size={24} />}
        >
          Directions
        </Button>
      </Group>
      <Group gap="sm">
        <PlaceIcon category={place?.category || Category.Sites} />
        <Title order={3} fw={500}>
          {place?.name}
        </Title>
      </Group>
      <Text opacity={0.7} my="md">
        {place?.address}
      </Text>
      <Group gap="sm">
        <Box
          w={40}
          h={40}
          p={8}
          c="white"
          bg={AccessibilityColorMap[accessibility]}
          style={{ borderRadius: 10000 }}
        >
          <MdAccessibleForward size={24} />
        </Box>
        <Text>{accessibility}</Text>
      </Group>
      {place?.description && (
        <>
          <Box my="lg" h={1} bg="#f1f1f1" />
          <Text opacity={0.7} my="md">
            {place.description}
          </Text>
        </>
      )}
      <Box my="lg" h={1} bg="#f1f1f1" />
      <Title order={4} fw={500}>
        Features
      </Title>
      <Text></Text>
      <Box my="lg" h={1} bg="#f1f1f1" />
    </>
  )
}
