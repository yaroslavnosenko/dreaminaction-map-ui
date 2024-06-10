import { Anchor, Box, BoxProps, Stack } from '@mantine/core'
import Link from 'next/link'

export const Footer = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Stack>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor w="auto" component={Link} href="/help">
          Help
        </Anchor>
      </Stack>
    </Box>
  )
}
