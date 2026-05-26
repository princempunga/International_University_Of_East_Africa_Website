"use client"

import { Helmet } from "react-helmet-async"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  pageType?: "website" | "article"
  noIndex?: boolean
}

const SITE_NAME = "International University of East Africa"
const BASE_URL = "https://www.iuea.ac.ug"
const DEFAULT_OG_IMAGE = "/og-home.png"

export function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl,
  pageType = "website",
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const metaDescription =
    description ||
    "International University of East Africa — offering world-class education, research and innovation in Kampala, Uganda."
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE
  const resolvedOgImageFullUrl = resolvedOgImage.startsWith("http") ? resolvedOgImage : `${BASE_URL}${resolvedOgImage}`
  const resolvedOgTitle = ogTitle || fullTitle
  const resolvedOgDescription = ogDescription || metaDescription
  const resolvedCanonical = canonicalUrl || BASE_URL

  return (
    <Helmet>
      {/* Document title */}
      <title>{fullTitle}</title>

      {/* Standard meta */}
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />

      {/* Open Graph */}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImageFullUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={resolvedOgImageFullUrl} />
      <meta name="twitter:site" content="@IUEAUganda" />

      {/* Canonical */}
      <link rel="canonical" href={resolvedCanonical} />
    </Helmet>
  )
}
