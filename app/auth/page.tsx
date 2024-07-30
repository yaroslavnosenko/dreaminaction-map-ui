import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Anchor, Box, Button, Center, Divider, Title } from '@mantine/core'
import { MdArrowBack } from 'react-icons/md'

import { getToken } from '@/services'

export default function AuthMock() {
  const token = cookies().get('auth-token')
  if (token) return redirect('/')

  async function handleAuth(formData: FormData) {
    'use server'
    const inputToken = formData.get('token')
    console.log(formData.get('token'))
    const { token } = await getToken(inputToken as string, 'facebook')
    cookies().set('auth-token', token)
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
          <form action={handleAuth}>
            <input hidden readOnly type="text" name="token" value="admin" />
            <Button w="100%" color="green" size="lg" radius="xl" type="submit">
              Sign in as Admin
            </Button>
          </form>
          <Divider my="md" label="or" labelPosition="center" />
          <form action={handleAuth}>
            <input hidden readOnly type="text" name="token" value="manager" />
            <Button w="100%" color="yellow" size="lg" radius="xl" type="submit">
              Sign in as Manager
            </Button>
          </form>
          <Divider my="md" label="or" labelPosition="center" />
          <form action={handleAuth}>
            <input hidden readOnly type="text" name="token" value="user" />
            <Button w="100%" color="red" size="lg" radius="xl" type="submit">
              Sign in as User
            </Button>
          </form>
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
