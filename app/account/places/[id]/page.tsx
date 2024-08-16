import { ActionIcon, Box, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'

import { t } from '@/i18n'
import { me } from '@/services/auth'
import { getFeatures } from '@/services/feature'
import { getPlaceById } from '@/services/place'
import { PageProps, UserRole } from '@/types'
import { redirect } from 'next/navigation'
import { PlaceTabs } from './tabs'

export default async function SavePlace({ params: { id } }: PageProps) {
  const user = await me()
  const isCreate = id === 'new'
  const place = await getPlaceById(id)
  const isAdmin = user?.role === UserRole.admin

  if (!isCreate && typeof place === 'number') {
    return redirect('/account/places')
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

        <Title order={2}>{isCreate ? t('labels.new') : t('labels.edit')}</Title>
      </Group>
      <PlaceTabs
        isAdmin={isAdmin}
        allFeatures={features}
        place={typeof place === 'number' ? null : place}
      />
    </Box>
  )
}
