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
  [PlaceAccessibility.compliant]: '#52c2b4',
  [PlaceAccessibility.partially_compliant]: '#f2e25e',
  [PlaceAccessibility.non_compliant]: '#e48277',
  [PlaceAccessibility.unknown]: '#000000',
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
    // <div className="flex flex-col gap-3 cursor-pointer group transition-all active:scale-95 hover:scale-105">
    //   <div className="flex items-center gap-3 group-hover:underline underline-offset-4">
    //     <PlaceIcon placeType={type} />
    //     <h3 className="text-xl">{name}</h3>
    //   </div>
    //   <p className="opacity-70">{address}</p>
    //   <div className="flex gap-3 items-center">
    //     <AccessibilityLabel accessibility={accessibility} />
    //     <p>•</p>
    //     <p className="text-sm">3 features</p>
    //   </div>
    // </div>
  )
}

export const PlaceList = () => {
  return (
    <>
      {places.map((place, idx) => (
        <PlaceItem place={place} key={idx} />
      ))}
    </>
  )
}
