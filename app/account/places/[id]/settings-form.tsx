import { AccessibilityArray, AccessibilityLabelMap } from '@/constants'
import { Accessibility, Place } from '@/types'
import { ComboboxData, NativeSelect, Select, Stack } from '@mantine/core'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import {
  onFetchUsers,
  onSetPlaceAccessibility,
  onSetPlaceOwner,
} from './actions'

type FormProps = {
  place: Place
  isAdmin: boolean
}

export const SettingsForm = ({ place, isAdmin }: FormProps) => {
  const current = {
    label: place.owner?.email!,
    value: place.owner?.id!,
    disabled: true,
  }
  const [data, setData] = useState<ComboboxData>([current])

  const handleAccessibilityChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const acc = await onSetPlaceAccessibility(
      place.id,
      parseInt(event.target.value, 10) as Accessibility
    )
    toast.success('Accessibility changed to ' + AccessibilityLabelMap[acc])
  }

  const handleSelect = async (value: string | null) => {
    await onSetPlaceOwner(place.id, value!)
    toast.success('Owner chaged')
  }

  const handleSearch = async (value: string) => {
    const res = await onFetchUsers(value)
    setData([
      current,
      ...res
        .filter(({ id }) => current.value !== id)
        .map(({ id, email }) => ({ label: email, value: id })),
    ])
  }

  return (
    <Stack gap="lg">
      <NativeSelect
        size="md"
        label="Accessibility"
        value={place.accessibility}
        onChange={handleAccessibilityChange}
        data={[
          ...AccessibilityArray.map((acc) => ({
            label: AccessibilityLabelMap[acc],
            value: String(acc),
          })),
        ]}
      />
      <Select
        size="md"
        searchable
        data={data}
        label="Owner"
        disabled={!isAdmin}
        withCheckIcon={false}
        onChange={handleSelect}
        defaultValue={current.value}
        onSearchChange={handleSearch}
      />
    </Stack>
  )
}
