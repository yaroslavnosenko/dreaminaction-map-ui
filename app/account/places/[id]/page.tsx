'use client'

import { DetailsTab, FeaturesTab, SettingsTab } from '@/components/account'
import { useMe } from '@/hooks'
import { places } from '@/mocks'
import { UserRole } from '@/types'
import { ActionIcon, Box, Group, Tabs, Title } from '@mantine/core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'

export default function SavePlace() {
  const { id } = useParams()
  const me = useMe()

  const isCreate = id === 'new'
  const isManager = me?.role !== UserRole.User

  const place = places.find((place) => place.id === id)

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

      <Tabs variant="pills" radius="xl" defaultValue="details">
        <Tabs.List>
          <Tabs.Tab value="details">
            <Title order={5}>Details</Title>
          </Tabs.Tab>
          <Tabs.Tab value="features">
            <Title order={5}>Features</Title>
          </Tabs.Tab>
          {isManager && (
            <Tabs.Tab value="settings">
              <Title order={5}>Settings</Title>
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Box h={1} bg="#f1f1f1" my="xl" />

        <Tabs.Panel value="details">
          <DetailsTab place={place} />
        </Tabs.Panel>
        <Tabs.Panel value="features">
          <FeaturesTab place={place} />
        </Tabs.Panel>
        {isManager && (
          <Tabs.Panel value="settings">
            <SettingsTab place={place} />
          </Tabs.Panel>
        )}
      </Tabs>
    </Box>
  )
}
