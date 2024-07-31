import { CategoriesArray } from '@/constants'
import { Place, PlaceInput } from '@/types'
import {
  Box,
  Button,
  Group,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOpenInNew } from 'react-icons/md'
import { onPlaceCreate } from './actions'

type FormProps = {
  place: Place | null
}

export const DetailsForm = ({ place }: FormProps) => {
  const { register, handleSubmit } = useForm<PlaceInput>({
    values: place ? place : undefined,
  })

  const onSubmit: SubmitHandler<PlaceInput> = async (data) => {
    const updatedData = {
      ...data,
      lng: parseFloat(String(data.lng)),
      lat: parseFloat(String(data.lat)),
    }
    if (!place) {
      await onPlaceCreate(updatedData)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg">
        <TextInput
          required
          size="md"
          label="Name"
          placeholder="Name"
          {...register('name')}
        />
        <NativeSelect
          required
          label="Category"
          size="md"
          data={[
            ...CategoriesArray.map((category) => ({
              label: category,
              value: category,
            })),
          ]}
          {...register('category')}
        />
        <TextInput
          required
          size="md"
          label="Address"
          placeholder="Address"
          {...register('address')}
        />
        <TextInput
          required
          size="md"
          label="Latitude"
          placeholder="Latitude"
          {...register('lat')}
        />
        <TextInput
          required
          size="md"
          label="Longitude"
          placeholder="Longitude"
          {...register('lng')}
        />
        <Textarea
          size="md"
          label="Description"
          placeholder="Description"
          autosize
          {...register('description')}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button type="submit" size="md" radius="xl" className="animated">
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
    </form>
  )
}
