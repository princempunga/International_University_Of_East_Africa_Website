import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Life | IUEA',
  description: 'Experience the vibrant campus life at the International University of East Africa.',
}

export default function StudentLifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
