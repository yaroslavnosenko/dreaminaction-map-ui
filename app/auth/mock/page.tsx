'use client'
import { useEffect } from 'react'

import { gql } from '@apollo/client'
import { Anchor, Box, Button, Center, Divider, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'
import { toast } from 'react-toastify'
import useLocalStorageState from 'use-local-storage-state'

import { StorageKeys } from '@/constants'
import { client } from '@/graphql'
import { Var, jql } from '@/utils'

import { AuthProvider, Mutation, MutationAuthArgs } from '@/types'

const mutation = gql(
  jql({
    mutation: {
      __variables: {
        input: 'AuthInput!',
      },
      auth: {
        __args: {
          input: new Var('input'),
        },
      },
    },
  })
)

export default function AuthMock() {
  const router = useRouter()
  const [auth, setAuth] = useLocalStorageState(StorageKeys.Auth)

  const handleAuth = async (token: string) => {
    try {
      const { data } = await client().mutate<Mutation, MutationAuthArgs>({
        mutation,
        variables: {
          input: { token, provider: AuthProvider.Google },
        },
      })
      setAuth(data?.auth || '')
      router.replace('/')
      toast.success('Signed in as ' + token)
    } catch {}
  }

  useEffect(() => {
    if (auth) router.replace('/')
  }, [router, auth])

  if (auth) {
    return null
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
          Mock Sign in
        </Title>
        <Box my="2xl">
          <Button
            w="100%"
            color="green"
            size="lg"
            radius="xl"
            onClick={() => handleAuth('admin')}
          >
            Sign in as Admin
          </Button>
          <Divider my="md" label="or" labelPosition="center" />
          <Button
            w="100%"
            size="lg"
            radius="xl"
            color="yellow"
            onClick={() => handleAuth('manager')}
          >
            Sign in as Manager
          </Button>
          <Divider my="md" label="or" labelPosition="center" />
          <Button
            w="100%"
            size="lg"
            radius="xl"
            color="red"
            onClick={() => handleAuth('user')}
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
