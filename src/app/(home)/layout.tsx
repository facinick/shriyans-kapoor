import RadixTheme from '@/components/providers/RadixThemeProvider'
import SessionProvider from '@/components/providers/SessionProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { Container } from '@/components/ui/Container/Container'
import { APP_DESCRIPTION, APP_TITLE } from '@/lib/constants'
import { getColorSchemeFromRequest } from '@/lib/server/color-scheme'
import { getThemeFromRequest } from '@/lib/server/theme'
import { ColorScheme, Theme } from '@/types/Theme'
import '@radix-ui/themes/styles.css'
import { Inter } from 'next/font/google'
import '../globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const colorScheme: ColorScheme = getColorSchemeFromRequest() || 'light'
  const theme: Theme = getThemeFromRequest() || 'summer'

  return (
    <html lang="en" data-color-scheme={colorScheme} data-theme={theme}>
      <SessionProvider>
        <ThemeProvider initialColorScheme={colorScheme} initialTheme={theme}>
          <body className={inter.className}>
            <RadixTheme>
              <Container size="4">
              {children}
              </Container>
            </RadixTheme>
          </body>
        </ThemeProvider>
      </SessionProvider>
    </html>
  )
}
