import { Providers } from './providers';
import { Inter } from 'next/font/google'
import Header from './header'
import Footer from './footer';
import { Box } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  showLogoutButton = false,
}: {
  children: React.ReactNode;
  showLogoutButton?: boolean;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header showLogoutButton={showLogoutButton} />
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
