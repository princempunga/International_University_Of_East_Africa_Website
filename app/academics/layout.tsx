import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academic Excellence | IUEA',
  description: 'Explore the faculties, programs, and academic excellence at IUEA.',
}

export default function AcademicsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
