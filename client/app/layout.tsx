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
        <link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css' rel='stylesheet' />
      </Head>
      <body className={`${BeauSans.variable} bg-border/50 dark:bg-background`}>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
