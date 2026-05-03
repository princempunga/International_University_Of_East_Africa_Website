import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our History | IUEA',
  description: 'A timeline of the International University of East Africa from foundation to present day.',
}

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
