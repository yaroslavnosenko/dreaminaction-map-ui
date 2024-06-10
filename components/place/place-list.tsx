import { PlaceIcon } from '@/components/place'
import { AccessibilityColorMap } from '@/constants'
import { Accessibility, Category, DeepPartial, Place } from '@/types'
import { Box, Group, Text, Title } from '@mantine/core'
import { MdAccessibleForward } from 'react-icons/md'

type PlaceType = DeepPartial<Place>

type PlaceItemProps = {
  place: PlaceType
  onClick: (place: PlaceType) => void
}

export const PlaceItem = ({ place, onClick }: PlaceItemProps) => {
  const {
    name,
    address,
    category = Category.Sites,
    accessibility = Accessibility.Unknown,
    featuresCount = 0,
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
        <Text>{accessibility}</Text>
        <Text>•</Text>
        <Text>{featuresCount} features</Text>
      </Group>
    </Box>
  )
}

export const renderList = (
  places: PlaceType[],
  onClick: (place: PlaceType) => void
) =>
  places.map((place) => (
    <PlaceItem place={place} onClick={onClick} key={place.id} />
  ))
