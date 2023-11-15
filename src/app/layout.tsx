import { Providers } from './providers';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './header'
import Footer from './footer';
import { Box } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header />
              <Box as='main'>
                {children}
              </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  )
}
