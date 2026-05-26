"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Twitter,
  Facebook,
  ChevronDown,
  ChevronUp,
  Upload,
  Info,
} from "lucide-react"

// ── All managed pages ───────────────────────────────────────────────────────
const PAGES = [
  { slug: "home",          label: "Home Page",      url: "https://www.iuea.ac.ug" },
  { slug: "about",         label: "About",          url: "https://www.iuea.ac.ug/about" },
  { slug: "academics",     label: "Academics",      url: "https://www.iuea.ac.ug/academics" },
  { slug: "admissions",    label: "Admissions",     url: "https://www.iuea.ac.ug/admissions" },
  { slug: "news",          label: "News & Events",  url: "https://www.iuea.ac.ug/news" },
  { slug: "gallery",       label: "Gallery",        url: "https://www.iuea.ac.ug/gallery" },
  { slug: "contact",       label: "Contact",        url: "https://www.iuea.ac.ug/contact" },
  { slug: "student-life",  label: "Student Life",   url: "https://www.iuea.ac.ug/student-life" },
  { slug: "shop",          label: "Shop",           url: "https://www.iuea.ac.ug/shop" },
  { slug: "research",      label: "Research",       url: "https://www.iuea.ac.ug/research" },
  { slug: "alumni",        label: "Alumni",         url: "https://www.iuea.ac.ug/alumni" },
  { slug: "library",       label: "Library",        url: "https://www.iuea.ac.ug/library" },
]

interface SeoRecord {
  id?: number
  page_slug: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  og_title: string
  og_description: string
  og_image: string
  canonical_url: string
}

// ── Google SERP Preview ─────────────────────────────────────────────────────
function GooglePreview({ title, description, url }: { title: string; description: string; url: string }) {
  const displayTitle = title.length > 60 ? title.slice(0, 57) + "..." : title || "Page Title"
  const displayDesc  = description.length > 155 ? description.slice(0, 152) + "..." : description || "Page description"
  const displayUrl   = url.replace("https://", "")

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Search className="w-3 h-3" /> Google Search Preview
      </p>
      <div className="space-y-1">
        <p className="text-[13px] text-gray-500 truncate">{displayUrl}</p>
        <p className="text-[20px] text-[#1a0dab] font-normal leading-tight cursor-pointer hover:underline line-clamp-1">
          {displayTitle}
        </p>
        <p className="text-[14px] text-gray-600 leading-snug line-clamp-2">{displayDesc}</p>
      </div>
      {/* Character counters */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex gap-6 text-[10px] font-black uppercase tracking-widest">
        <span className={title.length > 60 ? "text-red-500" : "text-emerald-500"}>
          Title: {title.length}/60
        </span>
        <span className={description.length > 155 ? "text-red-500" : "text-emerald-500"}>
          Desc: {description.length}/155
        </span>
      </div>
    </div>
  )
}

// ── Facebook/Twitter OG Preview ─────────────────────────────────────────────
function SocialPreview({ title, description, image, url }: {
  title: string; description: string; image: string; url: string
}) {
  const displayTitle = title || "Page Title"
  const displayDesc  = description || "Page description for social sharing."
  const domain       = url.replace("https://", "").split("/")[0]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Facebook className="w-3 h-3" /> Social Share Preview (Facebook / Twitter)
      </p>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="aspect-[1200/628] bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
          {image ? (
            <img src={image} alt="OG Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
              <Globe className="w-16 h-16 mb-3" />
              <p className="text-sm font-bold">No OG Image Set</p>
            </div>
          )}
        </div>
        <div className="bg-[#f2f3f4] px-4 py-3 border-t border-gray-200">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{domain}</p>
          <p className="text-sm font-bold text-gray-900 line-clamp-1">{displayTitle}</p>
          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{displayDesc}</p>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function SEOCMSPage() {
  const [seoMap, setSeoMap]         = useState<Record<string, SeoRecord>>({})
  const [loading, setLoading]       = useState(true)
  const [expandedPage, setExpandedPage] = useState<string | null>("home")
  const [saving, setSaving]         = useState<string | null>(null)
  const [message, setMessage]       = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [activePreview, setActivePreview] = useState<"google" | "social">("google")

  useEffect(() => {
    fetchAllSEO()
  }, [])

  const fetchAllSEO = async () => {
    try {
      const res  = await fetch("http://localhost:8000/api/seo/all")
      const data = await res.json()
      const map: Record<string, SeoRecord> = {}
      PAGES.forEach(p => {
        const found = data.find((d: any) => d.page_slug === p.slug)
        map[p.slug] = found || {
          page_slug:        p.slug,
          meta_title:       "",
          meta_description: "",
          meta_keywords:    "",
          og_title:         "",
          og_description:   "",
          og_image:         "",
          canonical_url:    p.url,
        }
      })
      setSeoMap(map)
    } catch (e) {
      console.error("Failed to load SEO data", e)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (slug: string, key: keyof SeoRecord, value: string) => {
    setSeoMap(prev => ({
      ...prev,
      [slug]: { ...prev[slug], [key]: value },
    }))
  }

  const handleSave = async (slug: string) => {
    setSaving(slug)
    setMessage(null)
    const token = localStorage.getItem("iuea_token")
    const data  = seoMap[slug]

    try {
      const res = await fetch("http://localhost:8000/api/seo/upsert", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
          Accept:         "application/json",
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        const updated = await res.json()
        setSeoMap(prev => ({ ...prev, [slug]: updated }))
        setMessage({ type: "success", text: `SEO settings for "${PAGES.find(p=>p.slug===slug)?.label}" saved!` })
        setTimeout(() => setMessage(null), 4000)
      } else {
        throw new Error("Save failed")
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." })
    } finally {
      setSaving(null)
    }
  }

  const handleImageUpload = async (slug: string, file: File) => {
    const token = localStorage.getItem("iuea_token")
    const fd    = new FormData()
    fd.append("image", file)
    fd.append("folder", "seo")
    try {
      const res  = await fetch("http://localhost:8000/api/cms/upload", {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:    fd,
      })
      const data = await res.json()
      if (data.url) handleChange(slug, "og_image", data.url)
    } catch (e) {
      console.error("Image upload failed", e)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading SEO settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">SEO Settings</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage meta tags, Open Graph, and social previews for every public page.
        </p>
      </div>

      {/* Status message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1,  y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-blue-700">
        <Info className="w-5 h-5 mt-0.5 shrink-0" />
        <span>
          <strong>Tip:</strong> Keep Meta Title under 60 characters and Meta Description under 155 for best Google display.
          Open Graph Image should be 1200×628 px for optimal social sharing.
        </span>
      </div>

      {/* Pages accordion */}
      <div className="space-y-4">
        {PAGES.map(page => {
          const seo      = seoMap[page.slug] || {}
          const isOpen   = expandedPage === page.slug
          const titleLen = (seo.meta_title || "").length
          const descLen  = (seo.meta_description || "").length
          const hasIssue = titleLen > 60 || descLen > 155 || titleLen === 0

          return (
            <div key={page.slug} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              {/* Accordion header */}
              <button
                onClick={() => setExpandedPage(isOpen ? null : page.slug)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${hasIssue ? "bg-amber-400" : "bg-emerald-400"}`} />
                  <div className="text-left">
                    <h3 className="font-black text-gray-900">{page.label}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{page.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {seo.meta_title && (
                    <span className="hidden md:block text-xs text-gray-400 max-w-[240px] truncate">{seo.meta_title}</span>
                  )}
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
                </div>
              </button>

              {/* Accordion body */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-gray-50"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 divide-y xl:divide-y-0 xl:divide-x divide-gray-50">
                    {/* ── LEFT: Inputs ── */}
                    <div className="p-8 space-y-6">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Tags</p>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Meta Title</label>
                          <span className={`text-[10px] font-black ${titleLen > 60 ? "text-red-500" : "text-gray-300"}`}>
                            {titleLen}/60
                          </span>
                        </div>
                        <input
                          type="text"
                          value={seo.meta_title || ""}
                          onChange={e => handleChange(page.slug, "meta_title", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all"
                          placeholder="e.g. IUEA - International University of East Africa"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Meta Description</label>
                          <span className={`text-[10px] font-black ${descLen > 155 ? "text-red-500" : "text-gray-300"}`}>
                            {descLen}/155
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={seo.meta_description || ""}
                          onChange={e => handleChange(page.slug, "meta_description", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all resize-none"
                          placeholder="A compelling description of this page for Google..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Keywords</label>
                        <input
                          type="text"
                          value={seo.meta_keywords || ""}
                          onChange={e => handleChange(page.slug, "meta_keywords", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all"
                          placeholder="university, east africa, kampala, education..."
                        />
                      </div>

                      <hr className="border-gray-100" />

                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Open Graph / Social</p>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">OG Title</label>
                        <input
                          type="text"
                          value={seo.og_title || ""}
                          onChange={e => handleChange(page.slug, "og_title", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all"
                          placeholder="Defaults to Meta Title if empty"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">OG Description</label>
                        <textarea
                          rows={2}
                          value={seo.og_description || ""}
                          onChange={e => handleChange(page.slug, "og_description", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all resize-none"
                          placeholder="Defaults to Meta Description if empty"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          OG Image <span className="text-gray-300 font-medium normal-case">(1200×628 recommended)</span>
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={seo.og_image || ""}
                            onChange={e => handleChange(page.slug, "og_image", e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all"
                            placeholder="https://... or /og-image.png"
                          />
                          <label className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all cursor-pointer text-xs">
                            <Upload className="w-4 h-4" /> Upload
                            <input type="file" className="hidden" accept="image/*"
                              onChange={e => e.target.files?.[0] && handleImageUpload(page.slug, e.target.files[0])} />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Canonical URL</label>
                        <input
                          type="text"
                          value={seo.canonical_url || page.url}
                          onChange={e => handleChange(page.slug, "canonical_url", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] outline-none transition-all"
                        />
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => handleSave(page.slug)}
                        disabled={saving === page.slug}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#8B0000] text-white font-black rounded-2xl hover:bg-[#6B0000] disabled:opacity-50 transition-all shadow-lg shadow-red-100"
                      >
                        {saving === page.slug ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        SAVE SEO SETTINGS
                      </button>
                    </div>

                    {/* ── RIGHT: Live Preview ── */}
                    <div className="p-8 bg-gray-50/50 space-y-6">
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Preview</p>
                        <button
                          onClick={() => setActivePreview("google")}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            activePreview === "google" ? "bg-[#8B0000] text-white" : "bg-white text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <Search className="w-3 h-3" /> Google
                        </button>
                        <button
                          onClick={() => setActivePreview("social")}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            activePreview === "social" ? "bg-[#8B0000] text-white" : "bg-white text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <Twitter className="w-3 h-3" /> Social
                        </button>
                      </div>

                      {activePreview === "google" ? (
                        <GooglePreview
                          title={seo.meta_title || ""}
                          description={seo.meta_description || ""}
                          url={seo.canonical_url || page.url}
                        />
                      ) : (
                        <SocialPreview
                          title={seo.og_title || seo.meta_title || ""}
                          description={seo.og_description || seo.meta_description || ""}
                          image={seo.og_image || ""}
                          url={seo.canonical_url || page.url}
                        />
                      )}

                      {/* Sitemap link */}
                      <div className="p-4 bg-white rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Sitemap</p>
                        <a
                          href="http://localhost:8000/api/sitemap.xml"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" /> View sitemap.xml →
                        </a>
                        <a
                          href="http://localhost:8000/api/robots.txt"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 mt-2"
                        >
                          <Globe className="w-3 h-3" /> View robots.txt →
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
