import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryProvider } from '@/components/providers/QueryProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const theme = createTheme({
  primaryColor: 'orange',
  primaryShade: { light: 6, dark: 5 },
  // Override Mantine's cold-grey dark palette with warm Forge tones.
  // Index 7 = Paper/Card background, 9 = deepest background.
  colors: {
    dark: [
      '#e8e0d5', // 0 — primary text
      '#d4c9bd', // 1 — slightly dimmed
      '#b09a87', // 2 — more dimmed
      '#7a614e', // 3 — placeholder / icons
      '#3d2e22', // 4 — subtle borders
      '#2c2318', // 5 — --border
      '#1e170f', // 6 — hover surface
      '#161210', // 7 — --surface (Paper / Card bg)
      '#100d0a', // 8
      '#0d0b08', // 9 — --bg (page background)
    ],
  },
})

export const metadata: Metadata = {
  title: 'Учёт часов',
  description: 'Учёт рабочих часов и заработка фрилансера',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-right" />
          <QueryProvider>{children}</QueryProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
