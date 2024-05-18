import { PlaceIcon } from '@/components/place'
import { places } from '@/mocks'
import { PlaceAccessibility, PlaceType } from '@/types'
import { Box, Group, Text, Title } from '@mantine/core'
import { MdAccessibleForward } from 'react-icons/md'

type Place = {
  name: string
  address: string
  type: PlaceType
  accessibility: PlaceAccessibility
}

const accessibilityLabelMap = {
  [PlaceAccessibility.compliant]: 'Compliant',
  [PlaceAccessibility.non_compliant]: 'Non Compliant',
  [PlaceAccessibility.partially_compliant]: 'Partially',
  [PlaceAccessibility.unknown]: 'Unknown',
}

const accessibilityColorMap = {
  [PlaceAccessibility.compliant]: 'green',
  [PlaceAccessibility.partially_compliant]: 'yellow',
  [PlaceAccessibility.non_compliant]: 'red',
  [PlaceAccessibility.unknown]: 'black',
}

type PlaceItemProps = {
  place: Place
}

export const PlaceItem = ({
  place: { name, address, type, accessibility },
}: PlaceItemProps) => {
  return (
    <Box className="animated">
      <Group gap="sm">
        <PlaceIcon placeType={type} />
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
          bg={accessibilityColorMap[accessibility]}
          style={{ borderRadius: 10000 }}
        >
          <MdAccessibleForward size={24} />
        </Box>
        <Text>{accessibilityLabelMap[accessibility]}</Text>
        <Text>•</Text>
        <Text>4 features</Text>
      </Group>
    </Box>
  )
}

export const renderList = () =>
  places.map((place, idx) => <PlaceItem place={place} key={idx} />)
