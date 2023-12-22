import type { Metadata } from 'next'
import './globals.css'
import { gilroy } from '../utils/fontGenerates'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/ui/navbar/navbar'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar></Navbar>
          <Toaster />
          <main className="mt-[80px]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
