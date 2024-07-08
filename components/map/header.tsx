import { StorageKeys } from '@/constants'
import { Anchor, Button, Flex } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineAccountCircle, MdOutlineKey } from 'react-icons/md'

export const Header = () => {
  const auth = localStorage.getItem(StorageKeys.Auth)

  return (
    <Flex justify="space-between" align="center">
      <Anchor component={Link} href="/" w={56} h={56}>
        <Image
          className="animated"
          priority
          src="/logo.svg"
          height={56}
          width={56}
          alt={'logo'}
        />
      </Anchor>
      {!auth && (
        <Button
          className="animated"
          component={Link}
          color="black"
          variant="filled"
          radius="xl"
          size="md"
          href="/auth"
          leftSection={<MdOutlineKey size={24} />}
        >
          Sign In
        </Button>
      )}
      {auth && (
        <Button
          className="animated"
          component={Link}
          color="black"
          variant="filled"
          radius="xl"
          size="md"
          href="/account"
          leftSection={<MdOutlineAccountCircle size={24} />}
        >
          Profile
        </Button>
      )}
    </Flex>
  )
}
