import {
  AccessibilityArray,
  AccessibilityLabelMap,
  CategoriesArray,
  CategoryLabelMap,
} from '@/constants'
import { Place, PlaceInput } from '@/types'
import {
  Box,
  Button,
  Group,
  Modal,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdDelete, MdOpenInNew } from 'react-icons/md'
import { toast } from 'react-toastify'
import { onPlaceCreate, onPlaceDelete, onPlaceUpdate } from './actions'

type FormProps = {
  place: Place | null
  isAdmin: boolean
}

export const DetailsForm = ({ place, isAdmin }: FormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit } = useForm<PlaceInput>({
    values: place ? place : undefined,
  })

  const onSubmit: SubmitHandler<PlaceInput> = async (data) => {
    const updatedData = {
      ...data,
      lng: parseFloat(String(data.lng)),
      lat: parseFloat(String(data.lat)),
      accessibility: parseInt(String(data.accessibility)),
    }
    if (!place) {
      await onPlaceCreate(updatedData)
    } else {
      await onPlaceUpdate(place.id, updatedData)
    }
    toast.success('Place saved!')
  }

  const handleDelete = async () => {
    await onPlaceDelete(place?.id!)
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
              label: CategoryLabelMap[category],
              value: category,
            })),
          ]}
          {...register('category')}
        />
        <NativeSelect
          required
          label="Accessibility"
          size="md"
          data={[
            ...AccessibilityArray.map((accessibility) => ({
              label: AccessibilityLabelMap[accessibility],
              value: String(accessibility),
            })),
          ]}
          {...register('accessibility')}
        />
        <TextInput
          required
          size="md"
          label="Address"
          placeholder="Address"
          {...register('address')}
        />
        <Group>
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
        </Group>
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
        {place && isAdmin && (
          <Button
            size="md"
            radius="xl"
            leftSection={<MdDelete size={24} />}
            className="animated"
            color="red"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
        )}
      </Group>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        withCloseButton={false}
        title="Delete Place?"
        centered
      >
        <Group pt={4} justify="flex-end">
          <Button onClick={() => setIsModalOpen(false)} variant="transparent">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </form>
  )
}
