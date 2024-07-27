'use client'

import {
  AccessibilityColorMap,
  AccessibilityLabelMap,
  CategoriesArray,
  FilterAccessibilityArray,
} from '@/constants'
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Divider,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import { MdOutlineChevronLeft, MdOutlineFilterAlt } from 'react-icons/md'

type FilterProps = {} & BoxProps

export const Filter = ({ ...props }: FilterProps) => {
  const [open, setOpen] = useState(true)

  return (
    <Box {...props}>
      <Button
        onClick={() => setOpen(!open)}
        mt="lg"
        w="100%"
        radius="xl"
        variant="outline"
        leftSection={<MdOutlineFilterAlt size={24} />}
        rightSection={
          <MdOutlineChevronLeft
            size={24}
            style={{ rotate: open ? '90deg' : '-90deg' }}
          />
        }
        hiddenFrom="xs"
        styles={{
          inner: {
            justifyContent: 'space-between',
          },
        }}
      >
        Filter
      </Button>
      {open && (
        <Box mt={{ base: 'lg', xs: '2xl' }}>
          <Title order={4}>Accessibility</Title>
          <Stack gap="md" mt="lg">
            {FilterAccessibilityArray.map((accessibility) => (
              <Checkbox
                radius="xl"
                checked={true}
                onChange={console.log}
                color={AccessibilityColorMap[accessibility]}
                key={accessibility}
                size="md"
                label={AccessibilityLabelMap[accessibility]}
              />
            ))}
          </Stack>
          <Divider my="xl" />
          <Title order={4}>Categories</Title>
          <SimpleGrid mt="lg" cols={2} spacing="md">
            {CategoriesArray.map((category) => (
              <Checkbox
                checked={true}
                onChange={console.log}
                key={category}
                radius="xl"
                size="md"
                label={category}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  )
}
