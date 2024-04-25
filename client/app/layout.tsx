import type { Metadata } from 'next'
import './globals.css'
import { BeauSans } from '@/utils/fontGenerates'
import { Toaster } from '@/components/ui/sonner'
import Providers from './providers'


export const metadata: Metadata = {
  title: 'Oupia',
  description: '',
  icons: {
    icon: './favicon.ico',
    other: {
      rel: 'stylesheet',
      url: 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css',
    },
  },
}

export default function RootLayout(
  { children, session }: { children: React.ReactNode, session: any }
) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${BeauSans.variable} bg-accent dark:bg-background`}>
        <Providers session={session}>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
