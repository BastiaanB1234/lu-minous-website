import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../shop/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lu Minous Webshop - Premium Nuts & Dried Fruits',
  description: 'Discover our premium selection of nuts, dried fruits, and superfoods. Fresh, healthy, and delicious products for a better lifestyle.',
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
