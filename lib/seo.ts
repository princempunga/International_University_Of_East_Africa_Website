import { Metadata } from "next"

// Hardcoded stable API URL for Server Components since they don't share the same env/context easily in dev
const API_URL = 'https://iuea-api-2026-v3.loca.lt/api'

export async function getPageMetadata(pageName: string): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}/seo/${pageName}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!res.ok) throw new Error("SEO not found")
    
    const { data } = await res.json()
    
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords?.split(",").map((k: string) => k.trim()),
      openGraph: {
        title: data.og_title || data.title,
        description: data.og_description || data.description,
        images: data.og_image ? [{ url: data.og_image }] : [],
      }
    }
  } catch (error) {
    // Fallback metadata
    return {
      title: "IUEA | International University of East Africa",
      description: "Learning to Succeed. NCHE Accredited institution in Kampala, Uganda.",
    }
  }
}
