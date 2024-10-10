import CategorySelector from '@/components/CategorySelector';
import Clock from '@/components/Clock';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MotionConfig from '@/components/MotionConfig';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import ThemeProvider from '@/components/providers/ThemeProvider/ThemeProvider';
import { Flex } from '@/components/ui/Flex';
import { Separator } from '@/components/ui/Separator';
import { Heading } from '@/components/ui/Typography';
import { APP_DESCRIPTION, APP_TITLE, CATEGORY_ALL, DEFAULT_COLOR_SCHEME, DEFAULT_PAGE, DEFAULT_THEME, USE_VIEW_TRANSITIONS } from '@/lib/constants';
import { headingFont, mainFont } from '@/lib/helpers/font-helper';
import { getCategories } from '@/lib/helpers/post-helper';
import {
  getColorSchemeFromRequest,
  getThemeFromRequest,
} from '@/lib/helpers/request-helpers';
import { ColorScheme, Theme } from '@/types/Theme';
import clsx from 'clsx';
import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import React from 'react';
import '../globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s • ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
};

interface RootLayoutProps {
  params: {
    category?: string;
  },
  searchParams: {
    page?: string;
  };
  children?: React.ReactNode;
}

interface LayoutProps {
  children?: React.ReactNode;
  categories: { data: Array<any> };
  category: string;
  page: number;
  colorScheme: ColorScheme;
  theme: Theme;
}

function Layout({
  children,
  categories,
  category,
  page,
  colorScheme,
  theme,
}: LayoutProps) {
  return (
    <html lang="en" data-color-scheme={colorScheme} data-theme={theme}>
      <head>
        {/* <meta name="theme-color" content={"hsl(var(--background))"} /> */}
      </head>
      <body className={mainFont.className}>
        <ThemeProvider initialColorScheme={colorScheme} initialTheme={theme}>
          <MotionConfig>
            <Header />
            <main className={styles.main}>
              <Flex direction={'column'} gap={5} asChild>
                <section className={styles['main-content']}>
                  <Heading
                    level={2}
                    asChild
                    className={clsx(headingFont.className, styles.heading)}
                  >
                    <h1
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}
                    >
                      <CategorySelector
                        categories={categories.data}
                        currentCategory={category}
                        currentPage={page}
                      />
                      <Clock />
                    </h1>
                  </Heading>
                  <Separator />
                  {children}
                  <Separator />
                </section>
              </Flex>
            </main>
            <Footer />
            <ScrollToTop />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default async function RootLayout({
  children,
  params,
  searchParams
}: RootLayoutProps) {

  const colorScheme = getColorSchemeFromRequest() || DEFAULT_COLOR_SCHEME
  const theme = getThemeFromRequest() || DEFAULT_THEME
  const category = String(params?.category || CATEGORY_ALL);
  const page = Number(searchParams?.page || DEFAULT_PAGE);

  const categories = await getCategories()

  return USE_VIEW_TRANSITIONS ? (
    <ViewTransitions>
      <Layout
        categories={categories}
        category={category}
        page={page}
        colorScheme={colorScheme}
        theme={theme}
      >
        {children}
      </Layout>
    </ViewTransitions >
  ) : (
    <Layout
      categories={categories}
      category={category}
      page={page}
      colorScheme={colorScheme}
      theme={theme}
    >
      {children}
    </Layout>
  );
}
