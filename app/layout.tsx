import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { Toast } from '@/components/shop/toast'
import { Chatbot } from '@/components/chatbot'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
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
  title: 'IUEA | International University of East Africa',
  description: 'International University of East Africa - Learning to Succeed. NCHE Accredited institution in Kampala, Uganda offering world-class education since 1998.',
  keywords: ['IUEA', 'International University of East Africa', 'Kampala', 'Uganda', 'University', 'Higher Education', 'NCHE Accredited'],
  icons: {
    icon: '/iuea-logo.png',
    apple: '/apple-icon.png',
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
        />
      </head>
      <body className="font-sans antialiased bg-[#F5F0E8]">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <Toast />
            <Chatbot />
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
