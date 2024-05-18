import { Button, Flex } from '@mantine/core'
import Image from 'next/image'
import { MdOutlineKey } from 'react-icons/md'

export const Header = () => {
  return (
    <Flex justify="space-between" align="center">
      <Image priority src="/logo.svg" height={56} width={56} alt={'logo'} />
      <Button
        color="black"
        variant="filled"
        radius="xl"
        size="md"
        leftSection={<MdOutlineKey size={24} />}
      >
        Sign In
      </Button>
    </Flex>
  )
}
