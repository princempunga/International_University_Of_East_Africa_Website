import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alumni Network | IUEA',
  description: 'Connect with the International University of East Africa alumni community and explore lifelong benefits.',
}

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
