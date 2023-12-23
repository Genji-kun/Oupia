import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/ui/navbar/navbar'
import Head from 'next/head'
import { BeauSans } from '@/utils/fontGenerates'

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
          <Toaster />
          <main className="mt-[80px] px-5 md:px-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
