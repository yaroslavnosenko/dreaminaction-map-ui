'use client'
import { useContext, useEffect } from 'react'

import { Box, Button, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  MdAccessibleForward,
  MdOutlineArrowBack,
  MdOutlineDirections,
} from 'react-icons/md'

import { MapContext } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { AccessibilityColorMap } from '@/constants'
import { Accessibility, Category } from '@/types'

export default function MapPage() {
  const { activePlace } = useContext(MapContext)
  const router = useRouter()
  const accessibility = activePlace?.accessibility || Accessibility.Unknown

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!activePlace) {
    return <>Loading</>
  }

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
        <PlaceIcon category={activePlace?.category || Category.Sites} />
        <Title order={3} fw={500}>
          {activePlace?.name}
        </Title>
      </Group>
      <Text opacity={0.7} my="md">
        {activePlace?.address}
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
      {activePlace?.description && (
        <>
          <Box my="lg" h={1} bg="#f1f1f1" />
          <Text opacity={0.7} my="md">
            {activePlace.description}
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
