#!/usr/bin/env node
/**
 * Injects the useCMSSEO hook into all public Next.js page files
 * Run once: node scripts/inject-seo.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const ROOT = 'c:/Users/Aime/.gemini/antigravity/scratch/International_University_Of_East_Africa_Website'

// Map of file path -> [slug, fallback title, fallback description]
const pages = [
  ['app/academics/page.tsx',       'academics',    'Academics | IUEA',           'Explore IUEA\'s diverse academic programs across multiple faculties.'],
  ['app/admissions/page.tsx',      'admissions',   'Admissions | IUEA',          'Apply to IUEA — find entry requirements, fees, and the application process.'],
  ['app/news/page.tsx',            'news',         'News & Events | IUEA',       'Stay updated with the latest news and events from IUEA.'],
  ['app/gallery/page.tsx',         'gallery',      'Gallery | IUEA',             'Browse photos from IUEA campus life, graduations, and events.'],
  ['app/contact/page.tsx',         'contact',      'Contact IUEA',               'Get in touch with IUEA admissions, admin or student services.'],
  ['app/student-life/page.tsx',    'student-life', 'Student Life | IUEA',        'Discover clubs, sports, accommodation and vibrant student life at IUEA.'],
  ['app/shop/page.tsx',            'shop',         'IUEA Shop',                  'Shop official IUEA merchandise — apparel, books and more.'],
  ['app/research/page.tsx',        'research',     'Research | IUEA',            'Explore research centers, projects and publications at IUEA.'],
  ['app/alumni/page.tsx',          'alumni',       'Alumni | IUEA',              'Connect with the IUEA alumni network — events, directory and more.'],
  ['app/library/page.tsx',         'library',      'Library | IUEA',             'Access IUEA\'s vast academic library resources and digital collections.'],
]

for (const [relPath, slug, title, description] of pages) {
  const filePath = join(ROOT, relPath)
  let src = readFileSync(filePath, 'utf8')

  // Skip if already injected
  if (src.includes('useCMSSEO')) {
    console.log(`✅ Already has SEO: ${relPath}`)
    continue
  }

  // Add import after last existing import
  const importLine = `import { useCMSSEO } from "@/hooks/useCMSSEO"\n`
  src = src.replace(
    /^("use client"\n\n?)?/,
    (match) => match
  )
  // Find insertion point after last import
  const lastImportIdx = src.lastIndexOf('\nimport ')
  const afterLastImport = src.indexOf('\n', lastImportIdx + 1)
  src = src.slice(0, afterLastImport + 1) + importLine + src.slice(afterLastImport + 1)

  // Find the export default function and inject hook + render
  src = src.replace(
    /export default function \w+\([^)]*\)\s*\{/,
    (match) => `${match}\n  const seoComponent = useCMSSEO('${slug}', { title: '${title}', description: '${description}' })\n`
  )

  // Inject {seoComponent} as first child of first <main>
  src = src.replace(
    /(<main[^>]*>)/,
    (match) => `${match}\n      {seoComponent}`
  )

  writeFileSync(filePath, src, 'utf8')
  console.log(`✅ Injected SEO: ${relPath}`)
}

console.log('\n🎉 SEO injection complete!')
