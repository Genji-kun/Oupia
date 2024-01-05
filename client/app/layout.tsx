import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import { BeauSans } from '@/utils/fontGenerates'
import { Toaster } from '@/components/ui/sonner'
import Providers from './providers'


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
      <body className={`${BeauSans.variable} scrollbar-track-background scrollbar-thumb-gray-300  dark:scrollbar-thumb-gray-700 scrollbar-thin`}>
        <Providers>
          <main>
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
