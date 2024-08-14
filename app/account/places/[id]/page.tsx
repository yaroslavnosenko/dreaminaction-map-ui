import { ActionIcon, Box, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'

import { me } from '@/services/auth'
import { getFeatures } from '@/services/feature'
import { getPlaceById } from '@/services/place'
import { UserRole } from '@/types'
import { redirect } from 'next/navigation'
import { PlaceTabs } from './tabs'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SavePlace({ params: { id } }: PageProps) {
  const user = await me()
  if (!user) {
    return redirect('/auth/logout')
  }
  const isCreate = id === 'new'
  const place = await getPlaceById(id)

  if (!isCreate && typeof place === 'number') {
    return redirect('/account')
  }

  const features = await getFeatures()

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
        isAdmin={user.role === UserRole.admin}
        allFeatures={features}
        place={typeof place === 'number' ? null : place}
      />
    </Box>
  )
}
