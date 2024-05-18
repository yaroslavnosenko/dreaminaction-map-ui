'use client'

import { Header, Map } from '@/components/map'
import { renderList } from '@/components/place'
import { DStack } from '@/components/ui'
import { places as _places } from '@/mocks'
import { Box, Flex, Group, Text, Title } from '@mantine/core'

import classes from '@/app/page.module.css'

export default function Home() {
  const places = _places

  return (
    <Flex className={classes['page']}>
      <Box component="nav" className={classes['sidebar']}>
        <Header />
      </Box>
      <Box maw="32rem" component="main" className={classes['main']}>
        <Group h={56} mb="2xl" justify="space-between">
          <Title order={2}>Uzhhorod</Title>
          <Title opacity={0.7} order={2} fw="normal">
            6
          </Title>
        </Group>
        <DStack divider={<Box h={1} bg="#f1f1f1" />} gap="xl">
          {renderList(places)}
        </DStack>
        <Text opacity={0.7} pt="2xl">
          End of the List
        </Text>
      </Box>
      <Box component="aside" className={classes['map']}>
        <Map places={places} />
      </Box>
    </Flex>
  )
}
