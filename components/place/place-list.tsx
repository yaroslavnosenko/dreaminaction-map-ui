'use client'

import { PlaceIcon } from '@/components/place'
import { DStack } from '@/components/ui'
import { AccessibilityColorMap, AccessibilityLabelMap } from '@/constants'
import { Accessibility, Category, Place } from '@/types'
import { Box, Group, Text, Title } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { MdAccessibleForward } from 'react-icons/md'

type PlaceItemProps = {
  place: Place
  onClick: (place: Place) => void
}

export const PlaceItem = ({ place, onClick }: PlaceItemProps) => {
  const {
    name,
    address,
    category = Category.sites,
    accessibility = Accessibility.unknown,
  } = place
  return (
    <Box onClick={() => onClick(place)} className="animated">
      <Group gap="sm">
        <PlaceIcon category={category} />
        <Title order={3} fw={500}>
          {name}
        </Title>
      </Group>
      <Text opacity={0.7} my="sm">
        {address}
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
        <Text>{AccessibilityLabelMap[accessibility]}</Text>
      </Group>
    </Box>
  )
}

interface PlaceListProps {
  places: Place[]
  partHref: string
}

export const PlaceList = ({ places, partHref }: PlaceListProps) => {
  const router = useRouter()
  const search = useSearchParams()
  return (
    <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
      {places.map((place) => (
        <PlaceItem
          place={place}
          onClick={() =>
            router.push(partHref + place.id + '?' + search.toString())
          }
          key={place.id}
        />
      ))}
    </DStack>
  )
}
