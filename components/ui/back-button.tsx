'use client'

import { Button } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { MdOutlineArrowBack } from 'react-icons/md'

export const BackButton = () => {
  const router = useRouter()
  const search = useSearchParams()
  return (
    <Button
      onClick={() => router.push('/?' + search.toString())}
      color="black"
      variant="transparent"
      radius="xl"
      size="md"
      p={0}
      leftSection={<MdOutlineArrowBack size={24} />}
    >
      Back
    </Button>
  )
}
