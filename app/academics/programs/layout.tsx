import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Programs | IUEA',
  description: 'View all undergraduate, postgraduate, and professional programs offered at IUEA.',
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
