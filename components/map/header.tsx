'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Anchor, Flex } from '@mantine/core'

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Anchor
        component={Link}
        href="https://www.dreaminaction.info/"
        w={98}
        h={56}
      >
        <Image
          className="animated"
          priority
          src="/logo.png"
          height={56}
          width={98}
          alt={'logo'}
          style={{ objectFit: 'cover' }}
        />
      </Anchor>
    </Flex>
  )
}
