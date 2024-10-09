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
import { APP_DESCRIPTION, APP_TITLE, CATEGORY_ALL, DEFAULT_PAGE } from '@/lib/constants';
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

// client side caching
export const getCategoriesCached = React.cache(async () => {
  try {
    return await getCategories();
  }
  // server side eror handling
  catch (error) {
    return {
      data: [],
      pagination: {
        totalResults: 0
      }
    }
  }
});

interface LayoutProps {
  params: {
    category?: string;
  },
  searchParams: {
    page?: string;
  };
  children?: React.ReactNode;
}

export default async function RootLayout({
  children,
  params,
  searchParams
}: LayoutProps) {
  const colorScheme: ColorScheme = getColorSchemeFromRequest() || ColorScheme.light
  const theme: Theme = getThemeFromRequest() || Theme.black

  const category = String(params?.category || CATEGORY_ALL);
  const page = Number(searchParams?.page || DEFAULT_PAGE);

  const categories = await getCategoriesCached();

  return (
    <ViewTransitions>
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
                      {/* CSS fallback styles */}
                      <h1
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <CategorySelector
                          categories={categories?.data!}
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
    </ViewTransitions>
  );
}
