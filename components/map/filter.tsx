'use client'

import {
  AccessibilityColorMap,
  AccessibilityLabelMap,
  CategoriesArray,
  FilterAccessibilityArray,
} from '@/constants'
import { Accessibility, Category } from '@/types'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineChevronLeft, MdOutlineFilterAlt } from 'react-icons/md'

type FilterProps = {} & BoxProps

export const Filter = ({ ...props }: FilterProps) => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const search = useSearchParams()

  const searchCat = search.get('categories')
  const categories: Category[] = !searchCat
    ? CategoriesArray
    : (searchCat.split(',') as Category[])

  const onCategoryToggle = (category: Category) => {
    const newSearch = new URLSearchParams(search.toString())
    let newCategoriesArray = [...categories]
    if (categories.includes(category)) {
      newCategoriesArray = newCategoriesArray.filter((cat) => cat !== category)
    } else {
      newCategoriesArray = [...newCategoriesArray, category]
    }
    if (
      CategoriesArray.length === newCategoriesArray.length ||
      newCategoriesArray.length === 0
    ) {
      newSearch.delete('categories')
    } else {
      newSearch.set('categories', newCategoriesArray.join(','))
    }
    router.push(location.pathname + '?' + newSearch.toString())
  }

  const searchAcc = search.get('accessibilities')
  const accessibilities: Accessibility[] = !searchAcc
    ? FilterAccessibilityArray
    : (searchAcc.split(',').map((acc) => parseInt(acc, 10)) as Accessibility[])

  const onAccessibilityToggle = (accessibility: Accessibility) => {
    const newSearch = new URLSearchParams(search.toString())
    let newArray = [...accessibilities]
    if (accessibilities.includes(accessibility)) {
      newArray = newArray.filter((acc) => acc !== accessibility)
    } else {
      newArray = [...newArray, accessibility]
    }
    if (
      FilterAccessibilityArray.length === newArray.length ||
      newArray.length === 0
    ) {
      newSearch.delete('accessibilities')
    } else {
      newSearch.set('accessibilities', newArray.join(','))
    }
    router.push(location.pathname + '?' + newSearch.toString())
  }

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
                checked={accessibilities.includes(accessibility)}
                onChange={() => onAccessibilityToggle(accessibility)}
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
                checked={categories.includes(category)}
                onChange={() => onCategoryToggle(category)}
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
