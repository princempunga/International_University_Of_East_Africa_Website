import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { AdmissionsContent } from "@/components/admissions-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("admissions")
}

export default function AdmissionsPage() {
  return <AdmissionsContent />
}
