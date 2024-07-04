import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MotionConfig from '@/components/MotionConfig';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import ThemeProvider from '@/components/providers/ThemeProvider/ThemeProvider';
import { APP_DESCRIPTION, APP_TITLE } from '@/lib/constants';
import { mainFont } from '@/lib/helpers/font-helper';
import {
  getColorSchemeFromRequest,
  getThemeFromRequest,
} from '@/lib/helpers/request-helpers';
import { ColorScheme, Theme } from '@/types/Theme';
import { Metadata } from 'next';
import '../globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s • ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme: ColorScheme = getColorSchemeFromRequest() || 'light';
  const theme: Theme = getThemeFromRequest() || 'blue';

  return (
    <html lang="en" data-color-scheme={colorScheme} data-theme={theme}>
      <head>
        {/* <meta name="theme-color" content={"hsl(var(--background))"} /> */}
      </head>
      <body className={mainFont.className}>
        {/* <SessionProvider> */}
        <ThemeProvider initialColorScheme={colorScheme} initialTheme={theme}>
          <MotionConfig>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
            <ScrollToTop />
          </MotionConfig>
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
