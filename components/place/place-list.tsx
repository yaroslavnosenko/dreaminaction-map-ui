import { PlaceIcon } from '@/components/place'
import { AccessibilityColorMap, AccessibilityLabelMap } from '@/constants'
import { places } from '@/mocks'
import { Accessibility, Category, DeepPartial, Place } from '@/types'
import { Box, Group, Text, Title } from '@mantine/core'
import { MdAccessibleForward } from 'react-icons/md'

type PlaceItemProps = {
  place: DeepPartial<Place>
}

export const PlaceItem = ({
  place: {
    name,
    address,
    category = Category.Sites,
    accessibility = Accessibility.Unknown,
  },
}: PlaceItemProps) => {
  return (
    <Box className="animated">
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
        <Text>•</Text>
        <Text>4 features</Text>
      </Group>
    </Box>
  )
}

export const renderList = () =>
  places.map((place) => <PlaceItem place={place} key={place.id} />)
