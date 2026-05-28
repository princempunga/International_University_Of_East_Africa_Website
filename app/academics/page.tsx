import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { AcademicsContent } from "@/components/academics-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("academics")
}

export default function AcademicsPage() {
  return <AcademicsContent />
}
