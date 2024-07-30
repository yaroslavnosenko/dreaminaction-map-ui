import { PropsWithChildren } from 'react'

import { Header, Menu } from '@/components/account'
import { getAuth } from '@/services'
import { Box, Flex, Stack } from '@mantine/core'
import { redirect } from 'next/navigation'
import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  const token = getAuth()
  if (!token) {
    return redirect('/auth')
  }
  const isManager = true

  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header />
        <Menu isManager={isManager} />
      </Stack>
      <Box component="main" className={classes['main']}>
        {children}
      </Box>
    </Flex>
  )
}
