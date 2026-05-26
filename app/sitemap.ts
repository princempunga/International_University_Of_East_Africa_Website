import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.iuea.ac.ug'
const API_URL  = 'http://localhost:8000/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/academics`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/admissions`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/news`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/gallery`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/student-life`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/shop`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE_URL}/research`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/alumni`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/library`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const res  = await fetch(`${API_URL}/news`, { next: { revalidate: 3600 } })
    const data = await res.json()
    if (data?.data) {
      newsPages = data.data.map((article: any) => ({
        url:             `${BASE_URL}/news/${article.slug}`,
        lastModified:    new Date(article.updated_at || article.created_at),
        changeFrequency: 'weekly' as const,
        priority:        0.7,
      }))
    }
  } catch (e) {}

  // Dynamic program pages
  let programPages: MetadataRoute.Sitemap = []
  try {
    const res  = await fetch(`${API_URL}/programs/search`, { next: { revalidate: 3600 } })
    const data = await res.json()
    if (Array.isArray(data)) {
      programPages = data.map((program: any) => ({
        url:             `${BASE_URL}/academics/programs/${program.slug}`,
        lastModified:    new Date(program.updated_at || program.created_at),
        changeFrequency: 'monthly' as const,
        priority:        0.8,
      }))
    }
  } catch (e) {}

  // Dynamic faculty pages
  let facultyPages: MetadataRoute.Sitemap = []
  try {
    const res  = await fetch(`${API_URL}/faculties`, { next: { revalidate: 3600 } })
    const data = await res.json()
    if (Array.isArray(data)) {
      facultyPages = data.map((faculty: any) => ({
        url:             `${BASE_URL}/academics/faculties/${faculty.slug}`,
        lastModified:    new Date(faculty.updated_at || faculty.created_at),
        changeFrequency: 'monthly' as const,
        priority:        0.8,
      }))
    }
  } catch (e) {}

  return [...staticPages, ...newsPages, ...programPages, ...facultyPages]
}
