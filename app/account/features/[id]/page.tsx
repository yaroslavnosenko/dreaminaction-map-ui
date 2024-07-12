'use client'
import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
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
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdArrowBack, MdDelete } from 'react-icons/md'

import {
  createFeatureMutation,
  deleteFeatureMutation,
  featuresQuery,
  updateFeatureMutation,
} from '../graphql'

import {
  Mutation,
  MutationCreateFeatureArgs,
  MutationDeleteFeatureArgs,
  MutationUpdateFeatureArgs,
  Query,
} from '@/types'

type InputFields = {
  name: string
}

export default function SaveFeature() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, setValue } = useForm<InputFields>()
  const router = useRouter()
  const { id } = useParams()
  const isCreate = id === 'new'

  const { data, loading: queryLoading } = useQuery<Query>(featuresQuery, {
    skip: isCreate,
  })

  const [create, { loading: createLoading }] = useMutation<
    Mutation,
    MutationCreateFeatureArgs
  >(createFeatureMutation, {
    refetchQueries: [{ query: featuresQuery }],
    awaitRefetchQueries: true,
  })

  const [update, { loading: updateLoading }] = useMutation<
    Mutation,
    MutationUpdateFeatureArgs
  >(updateFeatureMutation, {
    refetchQueries: [{ query: featuresQuery }],
    awaitRefetchQueries: true,
  })

  const [remove, { loading: deleteLoading }] = useMutation<
    Mutation,
    MutationDeleteFeatureArgs
  >(deleteFeatureMutation, {
    refetchQueries: [{ query: featuresQuery }],
    awaitRefetchQueries: true,
  })

  const loading =
    queryLoading || createLoading || deleteLoading || updateLoading

  useEffect(() => {
    if (!isCreate && data?.features) {
      const feature = data.features.find((feat) => feat.id === id)
      if (feature) {
        setValue('name', feature.name)
      }
    }
  }, [data, id, isCreate, setValue])

  const onSubmit: SubmitHandler<InputFields> = async ({ name }) => {
    if (isCreate) {
      await create({ variables: { input: { name } } })
    } else {
      await update({ variables: { id: id as string, input: { name } } })
    }
    router.push('/account/features')
  }

  const onDelete = async () => {
    await remove({ variables: { id: id as string } })
    router.push('/account/features')
  }

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
          disabled={loading}
          {...register('name', { required: true })}
        />
      </Stack>
      <Box h={1} bg="#f1f1f1" my="xl" />

      <Group>
        <Button
          size="md"
          radius="xl"
          className="animated"
          disabled={loading}
          type="submit"
        >
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
          <Button onClick={onDelete} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </form>
  )
}
