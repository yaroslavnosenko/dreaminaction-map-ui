import { DStack } from '@/components/ui'
import { t } from '@/i18n'
import { Feature, FeatureMapping, Place } from '@/types'
import { Box, Button, Flex, NativeSelect, Text } from '@mantine/core'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { onSetFeatures } from './actions'

type FormProps = {
  place: Place
  allFeatures: Feature[]
}

export const FeaturesForm = ({ place, allFeatures }: FormProps) => {
  const [features, setFeatures] = useState<FeatureMapping[]>([
    ...place.availableFeatures!.map(({ id }) => ({ id, available: true })),
    ...place.unavailableFeatures!.map(({ id }) => ({ id, available: false })),
  ])

  const onChange = (id: string, val: string) => {
    let newFeatures = features.filter((feat) => feat.id !== id)
    if (val === 'y') {
      newFeatures = [...newFeatures, { id, available: true }]
    }
    if (val === 'n') {
      newFeatures = [...newFeatures, { id, available: false }]
    }
    setFeatures([...newFeatures])
  }

  const handleSubmit = async () => {
    await onSetFeatures(place.id, features)
    toast.success(t('messages.saved'))
  }

  return (
    <Box>
      <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="md">
        {allFeatures.map(({ id, name }) => {
          let value = 'x'

          const candidate = features.find((feat) => feat.id === id)
          if (candidate) {
            value = candidate.available ? 'y' : 'n'
          }

          return (
            <Flex
              gap="md"
              wrap="wrap"
              key={id}
              justify="space-between"
              align="center"
            >
              <Text>{name}</Text>
              <NativeSelect
                size="md"
                value={value}
                data={[
                  { label: t('labels.yes'), value: 'y' },
                  { label: t('labels.no'), value: 'n' },
                  { label: '-', value: 'x' },
                ]}
                onChange={(eve) => onChange(id, eve.target.value)}
              />
            </Flex>
          )
        })}
      </DStack>
      <Box h={1} bg="#f1f1f1" my="xl" />
      <Button onClick={handleSubmit} size="md" radius="xl" className="animated">
        {t('labels.save')}
      </Button>
    </Box>
  )
}
