import { PlaceType } from '@/types'
import {
  Autocomplete,
  Box,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import Link from 'next/link'
import { MdOpenInNew } from 'react-icons/md'

type TabProps = {
  place?: PlaceType
}

export const DetailsTab = ({ place }: TabProps) => {
  return (
    <>
      <Stack gap="lg">
        <TextInput
          value={place?.name}
          required
          size="md"
          label="Name"
          placeholder="Name"
        />
        <Autocomplete
          value={place?.address}
          required
          size="md"
          label="Address"
          placeholder="Address"
        />
        <Textarea
          value={place?.description || ''}
          size="md"
          label="Description"
          placeholder="Description"
          autosize
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button size="md" radius="xl" className="animated">
          Save
        </Button>
        {place && (
          <Button
            component={Link}
            size="md"
            radius="xl"
            leftSection={<MdOpenInNew size={24} />}
            href={'/' + place.id}
            className="animated"
            variant="white"
            target="_blank"
          >
            Visit
          </Button>
        )}
      </Group>
    </>
  )
}
