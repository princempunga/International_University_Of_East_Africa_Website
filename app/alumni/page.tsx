import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { AlumniContent } from "@/components/alumni-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("alumni")
}

export default function AlumniPage() {
  return <AlumniContent />
}
