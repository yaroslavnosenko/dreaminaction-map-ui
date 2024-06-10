'use client'

import { Button, colorsTuple, createTheme } from '@mantine/core'

import { fontFamily } from '@/configs'

export const theme = createTheme({
  fontFamily,
  cursorType: 'pointer',
  primaryColor: 'black',
  activeClassName: '',
  colors: {
    black: colorsTuple('#000000'),
    green: colorsTuple('#52c2b4'),
    yellow: colorsTuple('#f2e25e'),
    red: colorsTuple('#e48277'),
  },
  spacing: {
    xs: 'calc(0.25rem * var(--mantine-scale))',
    sm: 'calc(0.5rem * var(--mantine-scale))',
    md: 'calc(1rem * var(--mantine-scale))',
    lg: 'calc(1.5rem * var(--mantine-scale))',
    xl: 'calc(2rem * var(--mantine-scale))',
    '2xl': 'calc(3rem * var(--mantine-scale))',
  },
  components: {
    Button: Button.extend({
      styles: {
        inner: {
          gap: 8,
        },
      },
    }),
  },
})
