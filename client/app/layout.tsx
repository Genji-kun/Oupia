import type { Metadata } from 'next'
import './globals.css'
import { gilroy } from '../utils/fontGenerates'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/ui/navbar/navbar'


export const metadata: Metadata = {
  title: 'Oupia',
  description: '',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gilroy.variable}`}>
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
