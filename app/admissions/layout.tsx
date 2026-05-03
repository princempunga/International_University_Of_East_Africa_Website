import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admissions | IUEA',
  description: 'Join the International University of East Africa. Explore our admissions process, requirements, and scholarship opportunities.',
}

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
