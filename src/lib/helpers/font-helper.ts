import { Bodoni_Moda, Merriweather, Open_Sans, Playfair_Display, Roboto_Slab } from 'next/font/google';

const acccentFont = Bodoni_Moda({
  weight: 'variable',
  style: 'italic',
  subsets: ['latin'],
});

const headingFont = Roboto_Slab({
  weight: '500',
  subsets: ['latin'],
});

const mainFont = Open_Sans({
  weight: '400',
  subsets: ['latin'],
});

const monoFont = Open_Sans({
  weight: '400',
  subsets: ['latin'],
});

export { acccentFont, headingFont, mainFont, monoFont };
