import { Anchor, Button, Flex } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineKey } from 'react-icons/md'

export const Header = () => {
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
    </Flex>
  )
}
