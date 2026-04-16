import '@/styles/index.css';
import { CustomThemeProvider } from '@/context/ThemeContext';
import NavigationProgress from '@/components/NavigationProgress';
import { Arsenal, Varela_Round, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';

const arsenal = Arsenal({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-arsenal',
  display: 'swap',
});

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-varela-round',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${arsenal.variable} ${varelaRound.variable} ${notoSans.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}>
              <CustomThemeProvider>
                <NavigationProgress />
                {children}
              </CustomThemeProvider>
            </body>
        </html>
    );
}