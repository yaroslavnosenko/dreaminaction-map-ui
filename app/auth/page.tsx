'use client'

import Image from 'next/image'
import Link from 'next/link'

import { t } from '@/i18n'
import { OtpInput } from '@/types'
import {
  Anchor,
  Box,
  Button,
  Center,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { MdArrowBack } from 'react-icons/md'
import { onSendOtp } from './actions'

export default function Auth() {
  const { register, handleSubmit } = useForm<OtpInput>()

  const onSubmit = ({ email }: OtpInput) => {
    onSendOtp(email)
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
        <Title mt="md" mb="xl" order={1}>
          {t('labels.signin')}
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack my="2xl">
            <TextInput
              required
              size="md"
              label={t('labels.email')}
              placeholder="email@mail.com"
              {...register('email', { required: true })}
            />
            <Button size="md" className="animated" type="submit">
              {t('labels.send-code')}
            </Button>
          </Stack>
        </form>

        <Button
          px={0}
          leftSection={<MdArrowBack size={24} />}
          mt="xl"
          href={'/'}
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
