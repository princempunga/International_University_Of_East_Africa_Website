/**
 * JSON-LD Structured Data Component
 * Adds schema.org markup for Google's Knowledge Graph & Rich Results.
 * Usage: <StructuredData type="university" /> or pass custom schema.
 */

const BASE_URL = "https://www.iuea.ac.ug"

interface StructuredDataProps {
  type?: "university" | "article" | "breadcrumb" | "faq"
  data?: Record<string, any>
}

// ── Predefined schemas ──────────────────────────────────────────────────────

function universitySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${BASE_URL}/#university`,
    "name": "International University of East Africa",
    "alternateName": "IUEA",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/Website-Logo.png`,
      "width": 200,
      "height": 60,
    },
    "image": `${BASE_URL}/og-home.png`,
    "description": "International University of East Africa (IUEA) is an NCHE-accredited private university in Kampala, Uganda, offering world-class undergraduate, postgraduate, and professional programs.",
    "foundingDate": "2011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 42 Ggaba Road",
      "addressLocality": "Kampala",
      "addressCountry": "UG",
    },
    "telephone": "+256-414-699-500",
    "email": "info@iuea.ac.ug",
    "sameAs": [
      "https://www.facebook.com/IUEAUganda",
      "https://twitter.com/IUEAUganda",
      "https://www.linkedin.com/school/iuea",
      "https://www.instagram.com/iueaug",
      "https://www.youtube.com/@IUEAUganda",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Programs",
      "description": "62+ undergraduate, postgraduate, and professional programs",
    },
    "numberOfStudents": {
      "@type": "QuantitativeValue",
      "value": 9000,
    },
    "accreditedBy": {
      "@type": "EducationalOrganization",
      "name": "Uganda National Council for Higher Education (NCHE)",
      "url": "https://www.unche.or.ug",
    },
  }
}

function articleSchema(data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": data.title,
    "description": data.description,
    "image": data.image || `${BASE_URL}/og-news.png`,
    "author": {
      "@type": "Organization",
      "name": "IUEA",
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "International University of East Africa",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/Website-Logo.png`,
      },
    },
    "datePublished": data.publishedAt || new Date().toISOString(),
    "dateModified": data.updatedAt || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url || BASE_URL,
    },
  }
}

function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export function StructuredData({ type = "university", data = {} }: StructuredDataProps) {
  let schema: Record<string, any>

  switch (type) {
    case "article":
      schema = articleSchema(data)
      break
    case "breadcrumb":
      schema = breadcrumbSchema(data.items || [])
      break
    case "faq":
      schema = faqSchema(data.items || [])
      break
    default:
      schema = universitySchema()
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}

// ── Convenience exports ─────────────────────────────────────────────────────

export function UniversitySchema() {
  return <StructuredData type="university" />
}

export function ArticleSchema(props: { title: string; description?: string; image?: string; url?: string; publishedAt?: string }) {
  return <StructuredData type="article" data={props} />
}

export function BreadcrumbSchema(props: { items: Array<{ name: string; url: string }> }) {
  return <StructuredData type="breadcrumb" data={props} />
}
