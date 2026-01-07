import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { siteConfig } from '@/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: siteConfig.seo.titulo,
  description: siteConfig.seo.descripcion,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.titulo,
    description: siteConfig.seo.descripcion,
    images: [siteConfig.seo.ogImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}
