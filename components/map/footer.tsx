import { Anchor, Box, BoxProps, Stack } from '@mantine/core'
import Link from 'next/link'

export const Footer = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Stack>
        <Anchor component={Link} href="https://dreaminaction.info/">
          Home
        </Anchor>
        <Anchor
          w="auto"
          component={Link}
          href="https://dreaminaction.info/map-help"
        >
          Help
        </Anchor>
      </Stack>
    </Box>
  )
}
