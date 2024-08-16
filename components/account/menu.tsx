import { t } from '@/i18n'
import { Anchor, Divider, Stack, Title } from '@mantine/core'
import Link from 'next/link'

type MenuProps = {
  isAdmin: boolean
}

export const Menu = ({ isAdmin }: MenuProps) => {
  return (
    <Stack mt="2xl" gap="md">
      <Anchor component={Link} href="/account/places">
        <Title order={4}>{t('labels.places')}</Title>
      </Anchor>
      <Anchor component={Link} href="/account/features">
        <Title order={4}>{t('labels.features')}</Title>
      </Anchor>
      {isAdmin && (
        <>
          <Divider my="xl" />
          <Anchor component={Link} href="/account/users">
            <Title order={4}>{t('labels.users')}</Title>
          </Anchor>
        </>
      )}
      <Divider my="xl" />
      <Anchor component={Link} href="/">
        <Title order={4}>{t('labels.back-to-map')}</Title>
      </Anchor>
      <Anchor component={Link} href="/auth/logout">
        <Title c="red" order={4}>
          {t('labels.logout')}
        </Title>
      </Anchor>
    </Stack>
  )
}
