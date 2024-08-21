'use client'

import { DeleteButton } from '@/components/ui'
import { t } from '@/i18n'
import { Feature, FeatureInput } from '@/types'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdArrowBack } from 'react-icons/md'
import { toast } from 'react-toastify'
import { onCreate, onDelete, onUpdate } from './actions'

type FeatureFormProps = {
  isCreate: boolean
  feature?: Feature
}

export const FeatureForm = ({ isCreate, feature }: FeatureFormProps) => {
  const { register, handleSubmit, setValue } = useForm<FeatureInput>()

  const onSubmit: SubmitHandler<FeatureInput> = async (input) => {
    if (isCreate) {
      await onCreate(input)
    } else {
      await onUpdate(feature?.id!, input)
    }
    toast.success(t('messages.saved'))
  }

  const handleDelete = async () => {
    await onDelete(feature?.id!)
    toast.success(t('messages.removed'))
  }

  useEffect(() => {
    if (feature) setValue('name', feature.name)
  }, [feature, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group h={56} mb="2xl">
        <ActionIcon
          component={Link}
          size="lg"
          radius="xl"
          href="/account/features"
          className="animated"
        >
          <MdArrowBack size={24} />
        </ActionIcon>
        <Title order={2}>{isCreate ? t('labels.new') : t('labels.edit')}</Title>
      </Group>
      <Stack gap="lg">
        <TextInput
          required
          size="md"
          label={t('labels.name')}
          placeholder={t('labels.name')}
          {...register('name', { required: true })}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button size="md" radius="xl" className="animated" type="submit">
          {t('labels.save')}
        </Button>
        {!isCreate && <DeleteButton onConfirm={handleDelete} />}
      </Group>
    </form>
  )
}
