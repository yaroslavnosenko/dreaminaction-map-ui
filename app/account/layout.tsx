import { PropsWithChildren } from 'react'

import { Header, Menu } from '@/components/account'
import { getAuth, getUser } from '@/services'
import { UserRole } from '@/types'
import { parseJwt } from '@/utils'
import { Box, Flex, Stack } from '@mantine/core'
import { redirect } from 'next/navigation'
import classes from './layout.module.css'

export default async function AccountLayout({ children }: PropsWithChildren) {
  const token = getAuth()
  if (!token) {
    return redirect('/auth')
  }
  const { uid } = parseJwt(token)
  const user = await getUser(uid)
  if (typeof user === 'number') {
    return redirect('/auth/logout')
  }
  const isManager = user.role !== UserRole.user

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
