'use client'
import { PropsWithChildren, useEffect } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Box, Center, Flex, Loader, Stack } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { Header, Menu } from '@/components/account'
import { client } from '@/graphql'
import { useMe } from '@/hooks'

import { UserRole } from '@/types'

import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  const me = useMe()
  const router = useRouter()
  const isManager = me?.role !== UserRole.User

  useEffect(() => {
    if (me === null) router.push('/')
  }, [router, me])

  if (me === null) {
    return null
  }
  if (me === undefined) {
    return (
      <Center mih="100vh">
        <Loader />
      </Center>
    )
  }
  return (
    <ApolloProvider client={client}>
      <Flex className={classes['layout']}>
        <Stack gap={0} component="nav" className={classes['sidebar']}>
          <Header />
          <Menu isManager={isManager} />
        </Stack>
        <Box component="main" className={classes['main']}>
          {children}
        </Box>
      </Flex>
    </ApolloProvider>
  )
}
