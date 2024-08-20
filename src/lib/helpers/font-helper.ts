import { Roboto, Roboto_Mono, Roboto_Slab } from 'next/font/google';

const headingFont = Roboto_Slab({
  weight: '400',
  subsets: ['latin'],
});

const mainFont = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const monoFont = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

export { headingFont, mainFont, monoFont };
