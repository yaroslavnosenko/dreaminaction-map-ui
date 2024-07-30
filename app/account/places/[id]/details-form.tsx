import { CategoriesArray } from '@/constants'
import { Place, PlaceInput } from '@/types'
import {
  Autocomplete,
  Box,
  Button,
  Group,
  Input,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOpenInNew } from 'react-icons/md'

type FormProps = {
  place: Place | null
}

export const DetailsForm = ({ place }: FormProps) => {
  const { register, handleSubmit, setValue } = useForm<PlaceInput>()

  const onSubmit: SubmitHandler<PlaceInput> = (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (place) {
    }
  }, [place])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg">
        <TextInput
          value={place?.name}
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
        <Autocomplete
          required
          size="md"
          data={['React', 'Angular']}
          label="Address"
          placeholder="Address"
        />
        <Input {...register('lat')} type="number" />
        <Input {...register('lat')} type="number" />
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
