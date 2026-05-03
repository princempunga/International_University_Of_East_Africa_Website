import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accreditation | IUEA',
  description: 'Details of the certifications, accreditations, and academic partnerships of IUEA.',
}

export default function AccreditationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
