import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About IUEA | International University of East Africa',
  description: 'Learn about the history, mission, vision, and leadership of IUEA, a leading private university in Uganda.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
