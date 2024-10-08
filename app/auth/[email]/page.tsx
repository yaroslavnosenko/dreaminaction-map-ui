'use client'

import Image from 'next/image'
import Link from 'next/link'

import { t } from '@/i18n'
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
  }, [email, setValue])

  const onSubmit = async (data: OtpValidateInput) => {
    await onValidateOtp(data)
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
          {t('labels.signin')}
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack my="2xl">
            <TextInput
              required
              size="md"
              label="Email"
              placeholder="email@email.com"
              disabled
              {...register('email', { required: true })}
            />

            <TextInput
              required
              size="md"
              label={t('labels.code')}
              minLength={6}
              maxLength={6}
              inputMode="tel"
              placeholder="------"
              {...register('otp', { required: true })}
            />

            <Button size="md" className="animated" type="submit">
              {t('labels.validate-code')}
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
          {t('labels.back')}
        </Button>
      </Box>
    </Center>
  )
}
