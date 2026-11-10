import { Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';

// Only the zh and ja root layout (src/app/(cjk)/cjk) imports these: their stylesheets are
// large and render-blocking, and Latin-script pages never use them.
export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});
