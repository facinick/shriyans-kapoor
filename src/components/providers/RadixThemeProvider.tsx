// "use client"
// import { Theme as RadixThemeProvider } from '@radix-ui/themes';
// import { ThemeProps } from '@radix-ui/themes/dist/cjs/theme';
// import React, { useMemo } from 'react';
// import { ThemeContext } from './ThemeProvider';

// interface Props {
//   children?: React.ReactNode
// }

// const RADIUS_MAP = {
//   "winter": {
//     "light" : "full",
//     "dark" : "full"
//   },
//   "summer": {
//     "light" : "none",
//     "dark" : "none"
//   }
// }

// const SCALING_MAP = {
//   "winter": {
//     "light" : "110%",
//     "dark" : "110%"
//   },
//   "summer": {
//     "light" : "110%",
//     "dark" : "110%",
//   }
// }

// const PANEL_BACKGROUND_MAP = {
//   "winter": {
//     "light" : "solid",
//     "dark" :"translucent"
//   },
//   "summer": {
//     "light" : "solid",
//     "dark" :"translucent"
//   }
// }

// const GRAY_CLOR_MAP = {
//   "winter": {
//     "light" : "slate",
//     "dark" : "slate",
//   },
//   "summer": {
//     "light" : "sand",
//     "dark" : "sand",
//   }
// }

// const ACCENT_CLOR_MAP = {
//   "winter": {
//     "light" : "blue",
//     "dark" : "blue",
//   },
//   "summer": {
//     "light" : "orange",
//     "dark" : "orange",
//   }
// }

// function RadixTheme({ children }: Props) {
//   const {theme, colorScheme} = React.useContext(ThemeContext);

//   const config = useMemo(() => ({
//     hasBackground: true,
//     appearance: colorScheme,
//     accentColor: ACCENT_CLOR_MAP[theme][colorScheme] as ThemeProps['accentColor'],
//     grayColor: GRAY_CLOR_MAP[theme][colorScheme] as ThemeProps['grayColor'],
//     panelBackground: PANEL_BACKGROUND_MAP[theme][colorScheme] as ThemeProps['panelBackground'],
//     radius: RADIUS_MAP[theme][colorScheme] as ThemeProps['radius'],
//     scaling: SCALING_MAP[theme][colorScheme] as ThemeProps['scaling'],
//   }), [theme, colorScheme])

//   return (
//     <RadixThemeProvider {...config}>
//       {children}
//     </RadixThemeProvider>
//   );
// }

// export default RadixTheme
