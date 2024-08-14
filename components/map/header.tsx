'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Anchor, Flex } from '@mantine/core'

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
    </Flex>
  )
}
