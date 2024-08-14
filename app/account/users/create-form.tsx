'use client'

import { UserInput, UserRole } from '@/types'
import { Button, Group, TextInput } from '@mantine/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { onCreate } from './actions'

export const CreateForm = () => {
  const { register, handleSubmit, setValue } = useForm<UserInput>()

  useEffect(() => {
    setValue('role', UserRole.manager)
  }, [setValue])

  const onSubmit = async (data: UserInput) => {
    await onCreate(data)
    setValue('email', '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group>
        <TextInput
          required
          size="md"
          placeholder="email@gmail.com"
          {...register('email', { required: true })}
        />
        <Button size="md" radius="xl" className="animated" type="submit">
          Create
        </Button>
      </Group>
    </form>
  )
}
