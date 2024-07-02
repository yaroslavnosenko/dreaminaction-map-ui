import { ActionIcon, Anchor, Flex } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineMenu } from 'react-icons/md'

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
      <ActionIcon
        size="xl"
        color="black"
        radius="xl"
        variant="filled"
        aria-label="Menu"
        hiddenFrom="xs"
      >
        <MdOutlineMenu size={24} />
      </ActionIcon>
    </Flex>
  )
}
