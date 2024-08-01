'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Anchor, Box, Button, Center, Divider, Title } from '@mantine/core'
import { MdArrowBack } from 'react-icons/md'
import { onAuth } from './actions'

export default function AuthMock() {
  const handleAuth = (token: string) => {
    onAuth(token)
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
        <Box my="2xl">
          <Button
            onClick={() => handleAuth('admin')}
            w="100%"
            color="green"
            size="lg"
            radius="xl"
            type="submit"
          >
            Sign in as Admin
          </Button>
          <Divider my="md" label="or" labelPosition="center" />
          <Button
            onClick={() => handleAuth('manager')}
            w="100%"
            color="yellow"
            size="lg"
            radius="xl"
            type="submit"
          >
            Sign in as Manager
          </Button>
          <Divider my="md" label="or" labelPosition="center" />
          <Button
            onClick={() => handleAuth('user')}
            w="100%"
            color="red"
            size="lg"
            radius="xl"
            type="submit"
          >
            Sign in as User
          </Button>
        </Box>
        <Button
          px={0}
          leftSection={<MdArrowBack size={24} />}
          mt="xl"
          href={'/'}
          component={Link}
          variant="transparent"
          className="animated"
        >
          Back to Map
        </Button>
      </Box>
    </Center>
  )
}
