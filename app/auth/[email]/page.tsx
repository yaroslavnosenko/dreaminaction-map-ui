'use client'

import Image from 'next/image'
import Link from 'next/link'

import { OtpValidateInput } from '@/types'
import {
  Anchor,
  Box,
  Button,
  Center,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdArrowBack } from 'react-icons/md'
import { onValidateOtp } from './actions'

export default function AuthEmail() {
  const { email } = useParams()
  const { register, handleSubmit, setValue } = useForm<OtpValidateInput>()
  useEffect(() => {
    setValue('email', decodeURIComponent(email as string))
  }, [email])

  const onSubmit = async (data: OtpValidateInput) => {
    const res = await onValidateOtp(data)
    console.log(res)
  }

  return (
    <Center mih="100svh" p="lg">
      <Box maw="24rem" w="100%">
        <Anchor component={Link} href="/" w={56}>
          <Image
            className="animated"
            priority
            src="/logo.svg"
            height={56}
            width={56}
            alt={'logo'}
          />
        </Anchor>
        <Title mt="md" order={1}>
          Sign in
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack my="2xl">
            <TextInput
              required
              size="md"
              label="Email"
              placeholder="email@gmail.com"
              disabled
              {...register('email', { required: true })}
            />

            <TextInput
              required
              size="md"
              label="Code"
              minLength={6}
              maxLength={6}
              inputMode="tel"
              placeholder="------"
              {...register('otp', { required: true })}
            />

            <Button size="md" className="animated" type="submit">
              Validate Code
            </Button>
          </Stack>
        </form>
        <Button
          px={0}
          leftSection={<MdArrowBack size={24} />}
          mt="xl"
          href={'/auth'}
          component={Link}
          variant="transparent"
          className="animated"
        >
          Back
        </Button>
      </Box>
    </Center>
  )
}
