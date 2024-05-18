'use client'

import { Header, Map } from '@/components/map'
import { Box, Flex, Group, Stack, Text, Title } from '@mantine/core'

import classes from '@/app/page.module.css'
import { PlaceList } from '@/components/place'

export default function Home() {
  return (
    <Flex mih="100vh" className={classes['page']}>
      <Box component="nav" className={classes['sidebar']}>
        <Header />
      </Box>
      <Box component="main" className={classes['main']}>
        <Group h={56} mb={48} justify="space-between">
          <Title order={2}>Uzhhorod</Title>
          <Title opacity={0.7} order={2} fw={500}>
            6
          </Title>
        </Group>
        <Stack gap={48}>
          <PlaceList />
        </Stack>
        <Text opacity={0.7} pt={48}>
          End of the List
        </Text>
      </Box>
      <Box component="aside" className={classes['map']}>
        <Map />
      </Box>
    </Flex>
  )
}
