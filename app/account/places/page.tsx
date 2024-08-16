import { Box, Button, Checkbox, Flex, Group, Text, Title } from '@mantine/core'

import { PlaceList } from '@/components/place'
import { SearchInput } from '@/components/ui'
import { AccessibilityArray, AccessibilityColorMap } from '@/constants'
import { t } from '@/i18n'
import { getPlaces } from '@/services/place'
import { Accessibility } from '@/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MdAdd } from 'react-icons/md'

export default async function Places() {
  const accessibilities: Accessibility[] = []
  const places = await getPlaces(accessibilities)
  if (typeof places === 'number') {
    redirect('/auth/logout')
  }
  return (
    <Box>
      <Group h={56} mb="xl" justify="space-between">
        <Title order={2}>{t('labels.places')}</Title>
        <Button
          component={Link}
          size="md"
          radius="xl"
          leftSection={<MdAdd size={24} />}
          href="/account/places/new"
          className="animated"
        >
          {t('labels.new')}
        </Button>
      </Group>
      <SearchInput charsCount={3} size="md" mb="xl" />
      <Flex gap="lg" wrap="wrap">
        {AccessibilityArray.map((accessibility) => (
          <Checkbox
            radius="xl"
            checked={!accessibilities.includes(accessibility)}
            color={AccessibilityColorMap[accessibility]}
            label={t('enums.accessibility.' + accessibility)}
            key={accessibility}
            size="md"
          />
        ))}
      </Flex>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <PlaceList places={places} partHref="/account/places/" />
      {places.length === 0 && <Text>{t('labels.empty-list')}</Text>}
    </Box>
  )
}
