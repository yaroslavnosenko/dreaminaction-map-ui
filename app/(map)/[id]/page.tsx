import { Map } from '@/components/map'
import { Box, Button, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import {
  MdAccessibleForward,
  MdOutlineArrowBack,
  MdOutlineDirections,
} from 'react-icons/md'
import classes from '../layout.module.css'

import { PlaceIcon } from '@/components/place'
import { AccessibilityColorMap, AccessibilityLabelMap } from '@/constants'
import { getPlacesByBounce, getPlacesById } from '@/services'
import { parseBoundsFromSearchParams } from '@/utils'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MapPage({
  params: { id },
  searchParams,
}: PageProps) {
  const place = await getPlacesById(id)
  const bounds = parseBoundsFromSearchParams(searchParams)
  const places = bounds ? await getPlacesByBounce() : null

  return (
    <>
      <Box component="main" className={classes['main']}>
        <Group h={56} mb="2xl" justify="space-between">
          <Button
            // onClick={() => router.push('/')}
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
            bg={AccessibilityColorMap[place!.accessibility]}
            style={{ borderRadius: 10000 }}
          >
            <MdAccessibleForward size={24} />
          </Box>
          <Text>{AccessibilityLabelMap[place!.accessibility]}</Text>
        </Group>
        {place!.description && (
          <>
            <Box my="lg" h={1} bg="#f1f1f1" />
            <Text opacity={0.7} my="md">
              {place!.description}
            </Text>
          </>
        )}
        <Box my="lg" h={1} bg="#f1f1f1" />
        <Title order={4} fw={500}>
          Features
        </Title>
        <Text></Text>
        <Box my="lg" h={1} bg="#f1f1f1" />
      </Box>
      <Box component="aside" className={classes['map']}>
        <Map places={places || []} bounds={bounds} />
      </Box>
    </>
  )
}
