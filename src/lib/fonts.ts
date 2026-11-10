import { Arsenal, Varela_Round, Noto_Sans } from 'next/font/google';

// Fonts for the Latin-script locale tree (src/app/(latin)). The CJK fonts live in fonts-cjk.ts.
export const arsenal = Arsenal({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-arsenal',
  display: 'swap',
});

export const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-varela-round',
  display: 'swap',
});

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});
