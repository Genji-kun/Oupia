import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Navbar from '@/components/ui/navbar/navbar'
import Head from 'next/head'
import { BeauSans } from '@/utils/fontGenerates'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Oupia',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={`${BeauSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar></Navbar>
          <main className="mt-[80px]">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
