import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { NewsContent } from "@/components/news-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("news")
}

export default function NewsPage() {
  return <NewsContent />
}
