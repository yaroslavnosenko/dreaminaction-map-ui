import { PropsWithChildren } from 'react'

import { Header, Menu } from '@/components/account'
import { me } from '@/services/auth'
import { UserRole } from '@/types'
import { Box, Flex, Stack } from '@mantine/core'
import { redirect } from 'next/navigation'
import classes from './layout.module.css'

export default async function AccountLayout({ children }: PropsWithChildren) {
  const user = await me()
  if (!user) {
    return redirect('/auth')
  }
  const isAdmin = user.role === UserRole.admin

  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header />
        <Menu isAdmin={isAdmin} />
      </Stack>
      <Box component="main" className={classes['main']}>
        {children}
      </Box>
    </Flex>
  )
}
