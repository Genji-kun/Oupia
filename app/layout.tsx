import type { Metadata } from 'next'
import './globals.css'
import { BeauSans } from '@/utils/fontGenerates'
import { Toaster } from '@/components/ui/sonner'
import Providers from './providers'


export const metadata: Metadata = {
  title: {
    default: "Oupia",
    template: " %s | Oupia",
  },
  description: 'Oupia là một nền tảng tìm kiếm nhà trọ thông minh và tin cậy thông qua việc ứng dụng công nghệ Blockchain.',
  icons: {
    icon: './favicon.ico',
    other: {
      rel: 'stylesheet',
      url: 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css',
    },
  },
}

type LayoutProps = {
  children?: React.ReactNode
}

type LayoutPropsExtended = {
  children?: React.ReactNode
  session?: any
}

const RootLayout = (props: LayoutProps | LayoutPropsExtended) => {

  const { children, session } = {
    ...props, session: undefined
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${BeauSans.variable} bg-accent dark:bg-background`}>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;