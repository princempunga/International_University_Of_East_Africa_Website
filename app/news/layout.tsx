import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Events | IUEA',
  description: 'Stay updated with the latest news, announcements, and events from the International University of East Africa.',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
