'use client'
import { PropsWithChildren, useEffect } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Box, Flex, Stack } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { Header, Menu } from '@/components/account'
import { client } from '@/graphql'

import { useMe } from '@/hooks'
import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  const me = useMe()
  const router = useRouter()

  useEffect(() => {
    if (me === null) router.push('/')
  }, [router, me])

  if (me === null) {
    return null
  }
  if (me === undefined) {
    return <>Loading</>
  }
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
