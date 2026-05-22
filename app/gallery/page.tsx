import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { GalleryContent } from "@/components/gallery-content"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("gallery")
}

export default function GalleryPage() {
  return <GalleryContent />
}
