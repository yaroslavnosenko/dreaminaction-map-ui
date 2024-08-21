import { font, theme } from '@/configs'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ToastContainer } from 'react-toastify'

import '@/app/animations.css'
import '@mantine/core/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'

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
        <MantineProvider theme={theme}>
          {children}
          <ToastContainer theme="colored" />
        </MantineProvider>
      </body>
    </html>
  )
}
