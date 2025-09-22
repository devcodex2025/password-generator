import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preload" as="image" href="/images/logo.svg" type="image/svg+xml" />
                <link rel="preload" as="image" href="/images/welcome-img.svg" type="image/svg+xml" />
                <link rel="preload" as="image" href="/images/vector-bg.svg" type="image/svg+xml" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="generatepasswordto.me" />
                <meta property="og:title" content="Generate Strong Passwords | generatepasswordto.me" />
                <meta property="og:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
                <meta property="og:image" content="/android-chrome-512x512.png" />
                <meta property="og:url" content="https://generatepasswordto.me" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Generate Strong Passwords | generatepasswordto.me" />
                <meta name="twitter:description" content="Create strong, secure passwords instantly. NIST 800-63B and PCI DSS aligned." />
                <meta name="twitter:image" content="/android-chrome-512x512.png" />
                {/* Google Analytics */}
                {process.env.NEXT_PUBLIC_GA_ID ? (
                  <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
                    <script
                      dangerouslySetInnerHTML={{
                        __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);} 
                          gtag('js', new Date());
                          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                            anonymize_ip: true,
                          });
                        `,
                      }}
                    />
                  </>
                ) : null}
            </head>
            <body className="w-full">
                <CustomThemeProvider>
                    <div id="root">{children}</div>
                </CustomThemeProvider>
            </body>
        </html>
    )
}