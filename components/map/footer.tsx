import { t } from '@/i18n'
import { Anchor, Box, BoxProps, Stack } from '@mantine/core'
import Link from 'next/link'

export const Footer = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Stack>
        <Anchor component={Link} href="https://dreaminaction.info/">
          {t('labels.home')}
        </Anchor>
        <Anchor
          w="auto"
          component={Link}
          href="https://dreaminaction.info/map-help"
        >
          {t('labels.help')}
        </Anchor>
      </Stack>
    </Box>
  )
}
