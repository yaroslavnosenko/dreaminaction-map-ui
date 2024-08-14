'use client'

import { Feature, Place } from '@/types'
import { Box, Tabs, Title } from '@mantine/core'
import { DetailsForm } from './details-form'
import { FeaturesForm } from './features-form'

type PlaceTabsProps = {
  allFeatures: Feature[]
  place: Place | null
  isAdmin: boolean
}

export const PlaceTabs = ({ place, allFeatures, isAdmin }: PlaceTabsProps) => {
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
      </Tabs.List>

      <Box h={1} bg="#f1f1f1" my="xl" />

      <Tabs.Panel value="details">
        <DetailsForm place={place} isAdmin={isAdmin} />
      </Tabs.Panel>
      {place && (
        <Tabs.Panel value="features">
          <FeaturesForm place={place} allFeatures={allFeatures} />
        </Tabs.Panel>
      )}
    </Tabs>
  )
}
