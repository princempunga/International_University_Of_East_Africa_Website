import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leadership | IUEA',
  description: 'Meet the executive team and academic leadership of the International University of East Africa.',
}

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
