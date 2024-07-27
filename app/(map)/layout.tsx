import { PropsWithChildren } from 'react'

import { Flex, Stack } from '@mantine/core'
import { cookies } from 'next/headers'

import { Filter, Footer, Header } from '@/components/map'
import classes from './layout.module.css'

export default async function MapLayout({ children }: PropsWithChildren) {
  const auth = cookies().get('auth-token')
  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header auth={!!auth} />
        <Filter flex={1} />
        <Footer visibleFrom="xs" />
      </Stack>
      {children}
    </Flex>
  )
}
