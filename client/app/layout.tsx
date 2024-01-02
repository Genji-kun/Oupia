import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Head from 'next/head'
import { BeauSans } from '@/utils/fontGenerates'
import { Toaster } from '@/components/ui/sonner'
import GoogleProvider from '@/components/providers/google-provider'

export const metadata: Metadata = {
  title: 'Oupia',
  description: '',
}

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={`${BeauSans.variable}`}>
        <GoogleProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main>
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </GoogleProvider>
      </body>
    </html>
  )
}
