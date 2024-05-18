import { font, theme } from '@/configs'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import type { Metadata } from 'next'

import '@/app/animations.css'
import '@mantine/core/styles.css'

export const metadata: Metadata = {
  title: 'Map | Dream In Action',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
