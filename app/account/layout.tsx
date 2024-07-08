'use client'

import { PropsWithChildren } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Box, Flex, Stack } from '@mantine/core'

import { Header, Menu } from '@/components/account'
import { client } from '@/graphql'

import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={client()}>
      <Flex className={classes['layout']}>
        <Stack gap={0} component="nav" className={classes['sidebar']}>
          <Header />
          <Menu />
        </Stack>
        <Box component="main" className={classes['main']}>
          {children}
        </Box>
      </Flex>
    </ApolloProvider>
  )
}
