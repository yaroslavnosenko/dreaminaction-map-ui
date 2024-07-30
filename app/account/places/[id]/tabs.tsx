'use client'

import { Feature, Place } from '@/types'
import { Box, Tabs, Title } from '@mantine/core'
import { DetailsForm } from './details-form'
import { FeaturesForm } from './features-form'
import { SettingsForm } from './settings-form'

type PlaceTabsProps = {
  isManager: boolean
  isAdmin: boolean
  allFeatures: Feature[]
  place: Place | null
}

export const PlaceTabs = ({
  isAdmin,
  isManager,
  place,
  allFeatures,
}: PlaceTabsProps) => {
  return (
    <Tabs variant="pills" radius="xl" defaultValue="details">
      <Tabs.List>
        <Tabs.Tab value="details">
          <Title order={5}>Details</Title>
        </Tabs.Tab>
        {place && (
          <Tabs.Tab value="features">
            <Title order={5}>Features</Title>
          </Tabs.Tab>
        )}
        {isManager && place && (
          <Tabs.Tab value="settings">
            <Title order={5}>Settings</Title>
          </Tabs.Tab>
        )}
      </Tabs.List>

      <Box h={1} bg="#f1f1f1" my="xl" />

      <Tabs.Panel value="details">
        <DetailsForm place={place} />
      </Tabs.Panel>
      {place && (
        <Tabs.Panel value="features">
          <FeaturesForm place={place} allFeatures={allFeatures} />
        </Tabs.Panel>
      )}
      {isManager && place && (
        <Tabs.Panel value="settings">
          <SettingsForm place={place} isAdmin={isAdmin} />
        </Tabs.Panel>
      )}
    </Tabs>
  )
}
