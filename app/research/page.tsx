import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { ResearchContent } from "@/components/research-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("research")
}

export default function ResearchPage() {
  return <ResearchContent />
}
