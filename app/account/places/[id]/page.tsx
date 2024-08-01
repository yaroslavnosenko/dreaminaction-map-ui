import { ActionIcon, Box, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'

import { getAuth, getFeatures, getPlaceById, getUser } from '@/services'
import { UserRole } from '@/types'
import { parseJwt } from '@/utils'
import { redirect } from 'next/navigation'
import { PlaceTabs } from './tabs'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SavePlace({ params: { id } }: PageProps) {
  const isCreate = id === 'new'
  const place = await getPlaceById(id)
  const token = getAuth()
  if (!token) {
    return redirect('/auth')
  }
  const { uid } = parseJwt(token)
  const user = await getUser(uid)
  if (typeof user === 'number') {
    return redirect('/auth/logout')
  }

  if (!isCreate && typeof place === 'number') {
    return redirect('/account')
  }

  const features = await getFeatures()
  const isManager = user.role !== UserRole.user
  const isAdmin = user.role === UserRole.admin

  return (
    <Box>
      <Group h={56} mb="2xl">
        <ActionIcon
          component={Link}
          size="lg"
          radius="xl"
          href="/account/places"
          className="animated"
        >
          <MdArrowBack size={24} />
        </ActionIcon>

        <Title order={2}>{isCreate ? 'Create Place' : 'Edit Place'}</Title>
      </Group>
      <PlaceTabs
        allFeatures={features}
        isManager={isManager}
        isAdmin={isAdmin}
        place={typeof place === 'number' ? null : place}
      />
    </Box>
  )
}
