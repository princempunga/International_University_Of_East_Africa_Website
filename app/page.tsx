import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { HomeContent } from "@/components/home-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home")
}

export default function Home() {
  return <HomeContent />
}
