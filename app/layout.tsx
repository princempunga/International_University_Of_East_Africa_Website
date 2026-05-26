import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { Toast } from '@/components/shop/toast'
import { Chatbot } from '@/components/chatbot'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { UniversitySchema } from '@/components/structured-data'
import { SEOProvider } from '@/components/seo-provider'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.iuea.ac.ug'),
  title: {
    default: 'IUEA | International University of East Africa',
    template: '%s | IUEA',
  },
  description: 'International University of East Africa — Learning to Succeed. NCHE Accredited institution in Kampala, Uganda offering world-class education since 1998.',
  keywords: ['IUEA', 'International University of East Africa', 'Kampala', 'Uganda', 'University', 'Higher Education', 'NCHE Accredited', 'degrees Uganda'],
  authors: [{ name: 'IUEA', url: 'https://www.iuea.ac.ug' }],
  creator: 'International University of East Africa',
  publisher: 'IUEA',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.iuea.ac.ug',
    siteName: 'International University of East Africa',
    title: 'IUEA — International University of East Africa',
    description: 'Empowering Africa\'s next generation through world-class education in Kampala, Uganda.',
    images: [{ url: '/og-home.png', width: 1200, height: 628, alt: 'IUEA Campus' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IUEA — International University of East Africa',
    description: 'World-class education in Kampala, Uganda. NCHE Accredited.',
    site: '@IUEAUganda',
    images: ['/og-home.png'],
  },
  icons: {
    icon: '/iuea-logo.png',
    apple: '/apple-icon.png',
    shortcut: '/iuea-logo.png',
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_CODE_HERE',
  },
  alternates: {
    canonical: 'https://www.iuea.ac.ug',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B0000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
        />
        <UniversitySchema />
      </head>
      <body className="font-sans antialiased bg-[#F5F0E8]">
        <SEOProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <Toast />
              <Chatbot />
            </CartProvider>
          </AuthProvider>
        </SEOProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
