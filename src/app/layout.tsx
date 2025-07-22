import { CustomThemeProvider } from '@/context/ThemeContext';
import '@/styles/index.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="w-full">
                <CustomThemeProvider>
                    <div id="root">{children}</div>
                </CustomThemeProvider>
            </body>
        </html>
    )
}