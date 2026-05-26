"use client"

import { useState, useEffect } from "react"
import { SEO } from "@/components/seo"

/**
 * Hook to load SEO data from CMS for any page slug.
 * Returns an SEO component ready to render.
 */
export function useCMSSEO(pageSlug: string, fallback?: {
  title?: string
  description?: string
  keywords?: string
}) {
  const [seoData, setSeoData] = useState<any>(null)

  useEffect(() => {
    fetch(`http://localhost:8000/api/seo/${pageSlug}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setSeoData(data) })
      .catch(() => {}) // Silently fall back to defaults if CMS is unavailable
  }, [pageSlug])

  return (
    <SEO
      title={seoData?.meta_title || fallback?.title}
      description={seoData?.meta_description || fallback?.description}
      keywords={seoData?.meta_keywords || fallback?.keywords}
      ogTitle={seoData?.og_title}
      ogDescription={seoData?.og_description}
      ogImage={seoData?.og_image}
      canonicalUrl={seoData?.canonical_url}
    />
  )
}
