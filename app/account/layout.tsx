'use client'

import { PropsWithChildren } from 'react'

import { Header, Menu } from '@/components/account'
import { Box, Flex, Stack } from '@mantine/core'

import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header />
        <Menu />
      </Stack>
      <Box component="main" className={classes['main']}>
        {children}
      </Box>
    </Flex>
  )
}
