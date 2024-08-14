import React, { PropsWithChildren } from 'react'

import { MantineSpacing, Stack, StackProps } from '@mantine/core'

type DStackProps = {
  divider: React.ReactElement<{ my?: MantineSpacing }>
} & StackProps &
  PropsWithChildren

export const DStack = ({ gap, divider, children, ...props }: DStackProps) => {
  const arr = React.Children.toArray(children)
  const itemsWithDividers = arr.reduce<React.ReactNode[]>(
    (acc, child, index) => {
      acc.push(child)
      if (index < arr.length - 1) {
        acc.push(React.cloneElement(divider, { key: `d-${index}`, my: gap }))
      }
      return acc
    },
    []
  )
  return (
    <Stack gap={0} {...props}>
      {itemsWithDividers}
    </Stack>
  )
}

export default DStack
