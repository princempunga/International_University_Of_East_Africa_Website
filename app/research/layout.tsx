import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research & Innovation | IUEA',
  description: 'Discover the groundbreaking research and innovative projects at the International University of East Africa.',
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
