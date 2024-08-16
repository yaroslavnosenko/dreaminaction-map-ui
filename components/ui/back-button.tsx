'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { t } from '@/i18n'
import { Button } from '@mantine/core'
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
      {t('labels.back')}
    </Button>
  )
}
