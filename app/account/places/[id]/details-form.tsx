import { DeleteButton } from '@/components/ui'
import { AccessibilityArray, CategoriesArray } from '@/constants'
import { t } from '@/i18n'
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
import { toast } from 'react-toastify'
import { onPlaceCreate, onPlaceDelete, onPlaceUpdate } from './actions'

type FormProps = {
  place: Place | null
  isAdmin: boolean
}

export const DetailsForm = ({ place, isAdmin }: FormProps) => {
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
    toast.success(t('messages.saved'))
  }

  const handleDelete = async () => {
    await onPlaceDelete(place?.id!)
    toast.success(t('messages.removed'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg">
        <TextInput
          required
          size="md"
          label={t('labels.name')}
          placeholder="..."
          {...register('name')}
        />
        <NativeSelect
          required
          label={t('labels.category')}
          size="md"
          data={[
            ...CategoriesArray.map((category) => ({
              label: t('enums.category.' + category),
              value: category,
            })),
          ]}
          {...register('category')}
        />
        <NativeSelect
          required
          label={t('labels.accessibility')}
          size="md"
          data={[
            ...AccessibilityArray.map((accessibility) => ({
              label: t('enums.accessibility.' + accessibility),
              value: String(accessibility),
            })),
          ]}
          {...register('accessibility')}
        />
        <TextInput
          required
          size="md"
          label={t('labels.address')}
          placeholder="..."
          {...register('address')}
        />
        <Group>
          <TextInput
            required
            size="md"
            label={t('labels.lat')}
            placeholder="0.0"
            {...register('lat')}
          />
          <TextInput
            required
            size="md"
            label={t('labels.lng')}
            placeholder="0.0"
            {...register('lng')}
          />
        </Group>
        <Textarea
          size="md"
          label={t('labels.description')}
          placeholder="..."
          autosize
          {...register('description')}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button type="submit" size="md" radius="xl" className="animated">
          {t('labels.save')}
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
            {t('labels.visit')}
          </Button>
        )}
        {place && isAdmin && <DeleteButton onConfirm={handleDelete} />}
      </Group>
    </form>
  )
}
