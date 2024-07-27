import { PropsWithChildren } from 'react'

import { Header, Menu } from '@/components/account'
import { Box, Flex, Stack } from '@mantine/core'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import classes from './layout.module.css'

export default function AccountLayout({ children }: PropsWithChildren) {
  const token = cookies().get('auth-token')
  if (!token) {
    return redirect('/auth')
  }

  return (
    <Flex className={classes['layout']}>
      <Stack gap={0} component="nav" className={classes['sidebar']}>
        <Header />
        <Menu isManager={true} />
      </Stack>
      <Box component="main" className={classes['main']}>
        {children}
      </Box>
    </Flex>
  )
}
