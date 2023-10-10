import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ThemeProvider from "@/components/providers/ThemeProvider/ThemeProvider";
import { mainFont } from "@/lib/helpers/font-helper";
import {
  getColorSchemeFromRequest,
  getThemeFromRequest,
} from "@/lib/helpers/request-helpers";
import { ColorScheme, Theme } from "@/types/Theme";
import "../globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme: ColorScheme = getColorSchemeFromRequest() || "light";
  const theme: Theme = getThemeFromRequest() || "blue";

  return (
    <html lang="en" data-color-scheme={colorScheme} data-theme={theme}>
      <head>
        <meta name="theme-color" content={"hsl(var(--background))"} />
      </head>
      <body className={mainFont.className}>
        {/* <SessionProvider> */}
        <ThemeProvider initialColorScheme={colorScheme} initialTheme={theme}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
