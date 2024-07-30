import { ActionIcon, Box, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'

import { getFeatures, getPlaceById } from '@/services'
import { redirect } from 'next/navigation'
import { PlaceTabs } from './tabs'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SavePlace({ params: { id } }: PageProps) {
  const isCreate = id === 'new'
  const place = await getPlaceById(id)
  if (!isCreate && !place) {
    return redirect('/account')
  }

  const features = await getFeatures()
  const isManager = true
  const isAdmin = true

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
        place={place}
      />
    </Box>
  )
}
