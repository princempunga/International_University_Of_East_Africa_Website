import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academic Calendar | IUEA',
  description: 'View the academic schedule, semester dates, and holidays at IUEA.',
}

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
