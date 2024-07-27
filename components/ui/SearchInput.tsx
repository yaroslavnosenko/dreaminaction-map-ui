'use client'
import { Input, InputProps } from '@mantine/core'
import { ChangeEvent, useCallback, useState } from 'react'

type SearchInputProps = {
  onQueryChange: (query: string) => void
  charsCount: number
} & InputProps

export const SearchInput = ({
  onQueryChange,
  charsCount,
  ...props
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleThrottle = useCallback(
    (value: string) => {
      if (value.length % charsCount === 0) {
        onQueryChange(value)
      }
    },
    [onQueryChange, charsCount]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    handleThrottle(value)
  }

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      placeholder="Search"
      {...props}
    />
  )
}
