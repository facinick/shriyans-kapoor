"use client"

import { ColorScheme, Theme } from '@/types/Theme';
import Cookie from 'js-cookie';
import React, { createContext, useEffect, useMemo } from 'react';

export const ThemeContext = createContext<{
  colorScheme: ColorScheme
  theme: Theme
  toggleColorScheme: () => void
  changeTheme: (to: Theme) => void
}>({
  colorScheme: 'light',
  theme: 'blue',
  toggleColorScheme: () => {},
  changeTheme: (to: Theme) => {},
})

interface Props {
  initialColorScheme: ColorScheme
  initialTheme: Theme
  children: React.ReactNode
}

function ThemeProvider({ initialColorScheme, initialTheme, children }: Props) {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(initialColorScheme);
  const [theme, setTheme] = React.useState<Theme>(initialTheme);

  function toggleColorScheme() {
    const nextColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(nextColorScheme);
  }

  function changeTheme(to: Theme) {
    setTheme(to);
  }

  // change theme on OS theme change
  useEffect(() => {

    function handleOSThemeToggle(event: MediaQueryListEvent) {
      setColorScheme(event.matches ? 'dark' : 'light')
    }

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    themeQuery.addEventListener('change', handleOSThemeToggle);

    return () => themeQuery.removeEventListener('change', handleOSThemeToggle)
  }, [])

  // persist theme on theme change
  useEffect(() => {  
    Cookie.set('color-scheme', colorScheme, {
      expires: 1000,
    });
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme])

  useEffect(() => {  
    Cookie.set('theme', theme, {
      expires: 1000,
    });
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  // memoize so if provider re renders, pure components consuming don't get re rendered
  // due to recreation of brand new value object
  const value = useMemo(() => ({
    theme,
    colorScheme,
    toggleColorScheme,
    changeTheme
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [theme, colorScheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider