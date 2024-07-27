'use client'
import { Input, InputProps } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'

type SearchInputProps = {
  initValue: string
  charsCount: number
} & InputProps

export const SearchInput = ({
  charsCount,
  initValue,
  ...props
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>(initValue)
  const router = useRouter()
  const search = useSearchParams()

  const handleThrottle = useCallback(
    (value: string) => {
      if (value.length % charsCount === 0) {
        const newSearch = new URLSearchParams(search)
        newSearch.set('query', value)
        router.push(location.pathname + '?' + newSearch.toString())
      }
    },
    [charsCount, router]
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
