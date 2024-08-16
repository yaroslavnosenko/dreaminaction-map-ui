'use client'
import { ChangeEvent, useCallback, useState } from 'react'

import { t } from '@/i18n'
import { Input, InputProps } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'

type SearchInputProps = {
  initValue?: string
  charsCount: number
} & InputProps

export const SearchInput = ({
  charsCount,
  initValue,
  ...props
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>(initValue)
  const router = useRouter()
  const search = useSearchParams()

  const handleThrottle = useCallback(
    (value: string) => {
      if (value.length % charsCount === 0) {
        const newSearch = new URLSearchParams(search)
        newSearch.set('query', value)
        if (value.length === 0) {
          newSearch.delete('query')
        }
        router.push(location.pathname + '?' + newSearch.toString())
      }
    },
    [charsCount, router, search]
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
      placeholder={t('labels.search')}
      {...props}
    />
  )
}
