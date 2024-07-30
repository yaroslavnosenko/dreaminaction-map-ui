import { DStack } from '@/components/ui'
import { Feature, Place } from '@/types'
import { Box, Button, Flex, NativeSelect, Text } from '@mantine/core'

type FormProps = {
  place: Place
  allFeatures: Feature[]
}

export const FeaturesForm = ({ place, allFeatures }: FormProps) => {
  return (
    <Box>
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="md">
        {allFeatures.map(({ id, name }) => (
          <Flex
            gap="md"
            wrap="wrap"
            key={id}
            justify="space-between"
            align="center"
          >
            <Text>{name}</Text>
            <NativeSelect size="md" data={['Yes', 'No', 'N/A']} />
          </Flex>
        ))}
      </DStack>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <Button size="md" radius="xl" className="animated">
        Save
      </Button>
    </Box>
  )
}
