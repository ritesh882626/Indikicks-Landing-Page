import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import '../styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '600', '700', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://indikicks.vercel.app'),
  title: 'INDIKICKS™ — Own Your Walk | Culture-First Sneaker & Streetwear Label',
  description:
    'INDIKICKS™ is a premium culture-first sneaker and streetwear label from India. Built for individuality, movement, and modern Indian self-expression.',
  openGraph: {
    title: 'INDIKICKS™ — Own Your Walk',
    description:
      'A premium culture-first sneaker and streetwear label from India. Built for individuality, movement, and modern Indian self-expression.',
    images: ['/images/brand-pack/hero.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'INDIKICKS',
    slogan: 'Own Your Walk.',
    foundingLocation: 'India',
    foundingDate: '2026',
    description: 'Premium culture-first sneaker and streetwear label from India.',
  }

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {children}
      </body>
    </html>
  )
}
