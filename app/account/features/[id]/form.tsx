'use client'

import { FeatureResponse } from '@/services/types'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdArrowBack, MdDelete } from 'react-icons/md'
import { onCreate, onDelete, onUpdate } from './actions'

type InputFields = {
  name: string
}

type FeatureFormProps = {
  isCreate: boolean
  feature?: FeatureResponse
}

export const FeatureForm = ({ isCreate, feature }: FeatureFormProps) => {
  const { register, handleSubmit, setValue } = useForm<InputFields>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    if (isCreate) {
      await onCreate(data)
      router.push('/account/features')
    } else {
      await onUpdate(feature?.id!, data)
      router.push('/account/features')
    }
  }

  const handleDelete = () => onDelete(feature?.id!)

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
        <Title order={2}>{isCreate ? 'New Feature' : 'Edit Feature'}</Title>
      </Group>
      <Stack gap="lg">
        <TextInput
          required
          size="md"
          label="Name"
          placeholder="Name"
          {...register('name', { required: true })}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button size="md" radius="xl" className="animated" type="submit">
          Submit
        </Button>
        {!isCreate && (
          <Button
            onClick={() => setIsModalOpen(true)}
            leftSection={<MdDelete size={24} />}
            className="animated"
            variant="white"
            radius="xl"
            color="red"
            size="md"
          >
            Delete
          </Button>
        )}
      </Group>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        withCloseButton={false}
        title="Delete the future?"
        centered
      >
        <Group pt={4} justify="flex-end">
          <Button onClick={() => setIsModalOpen(false)} variant="transparent">
            Cancel
          </Button>
          {!isCreate && (
            <Button onClick={handleDelete} color="red">
              Delete
            </Button>
          )}
        </Group>
      </Modal>
    </form>
  )
}
