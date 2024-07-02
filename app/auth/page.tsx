import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Text,
  Title,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { MdArrowBack } from 'react-icons/md'

export default function Auth() {
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
            leftSection={<FaGoogle />}
            w="100%"
            color="red"
            size="lg"
            radius="xl"
          >
            Sign in with Google
          </Button>
          <Divider my="md" label="or" labelPosition="center" />
          <Button
            leftSection={<FaFacebook />}
            w="100%"
            size="lg"
            radius="xl"
            color="blue"
          >
            Sign in with Facebook
          </Button>
        </Box>
        <Text>
          By creating an account you agree with our{' '}
          <Anchor c="green" component={Link} href="/">
            Terms of Service
          </Anchor>{' '}
          and{' '}
          <Anchor c="green" component={Link} href="/">
            Privacy Policy
          </Anchor>
          .
        </Text>
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
