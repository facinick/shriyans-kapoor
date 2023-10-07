import { Header } from '@/components/Header/Header'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { APP_DESCRIPTION, APP_TITLE } from '@/lib/constants'
import { getColorSchemeFromRequest } from '@/lib/server/color-scheme'
import { getThemeFromRequest } from '@/lib/server/theme'
import { ColorScheme, Theme } from '@/types/Theme'
import { Inter } from 'next/font/google'
import '../globals.css'
import styles from './layout.module.css'

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
  const theme: Theme = getThemeFromRequest() || 'blue'

  return (
    <html lang="en" data-color-scheme={colorScheme} data-theme={theme}>
      <body className={inter.className}>
        {/* <SessionProvider> */}
          <ThemeProvider initialColorScheme={colorScheme} initialTheme={theme}>
            <Header />
            <main className={styles.main}>{children}</main>
          </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
