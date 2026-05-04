"use client"

import { useState, useEffect, useRef } from "react"
import { Newspaper, Plus, Search, Edit, Trash2, ExternalLink, X, Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, Send, EyeOff } from "lucide-react"
import api from "@/lib/api"
import Image from "next/image"
import Link from "next/link"

// ─── Types ────────────────────────────────────────────────────────────────────
type NewsItem = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: "news" | "events" | "research" | "campus" | "achievement"
  status: "draft" | "published"
  featured_image?: string
  is_featured: boolean
  published_at?: string
  author?: { name: string }
}

const CATEGORIES = ["news", "events", "research", "campus", "achievement"] as const

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[680px] max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-7 pb-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-[24px]">
          <h2 className="text-xl font-serif font-bold text-[#1A0A00]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  )
}

// ─── Confirm Delete ───────────────────────────────────────────────────────────
function ConfirmDialog({ name, onConfirm, onCancel, isLoading }: { name: string; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[420px] shadow-2xl p-8">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Article?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <strong>"{name}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Article Form ─────────────────────────────────────────────────────────────
function ArticleForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  submitLabel,
}: {
  initialData?: Partial<NewsItem>
  onSubmit: (fd: FormData) => void
  onCancel: () => void
  isSubmitting: boolean
  error: string
  submitLabel: string
}) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [category, setCategory] = useState<string>(initialData?.category || "news")
  const [status, setStatus] = useState<string>(initialData?.status || "draft")
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(initialData?.featured_image || "")
  const fileRef = useRef<HTMLInputElement>(null)

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append("title", title)
    fd.append("excerpt", excerpt)
    fd.append("content", content)
    fd.append("category", category)
    fd.append("status", status)
    fd.append("is_featured", isFeatured ? "1" : "0")
    if (imageFile) fd.append("image", imageFile)
    onSubmit(fd)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className={labelClass}>Article Title <span className="text-red-500">*</span></label>
        <input required type="text" placeholder='e.g. "IUEA Wins National Innovation Award"' className={inputClass} value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClass}>Excerpt <span className="text-red-500">*</span></label>
        <textarea
          required
          rows={2}
          placeholder="Short summary shown in listings..."
          className={`${inputClass} resize-none`}
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
        />
      </div>

      {/* Content */}
      <div>
        <label className={labelClass}>Full Content <span className="text-red-500">*</span></label>
        <textarea
          required
          rows={8}
          placeholder="Write the full article content here..."
          className={`${inputClass} resize-y min-h-[160px]`}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category <span className="text-red-500">*</span></label>
          <select required className={inputClass} value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={inputClass} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Featured toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-bold text-[#1A0A00]">Featured Article</p>
          <p className="text-xs text-gray-400">Show prominently on the news homepage</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFeatured(v => !v)}
          className={`relative w-12 h-6 rounded-full transition-colors ${isFeatured ? "bg-[#8B0000]" : "bg-gray-200"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isFeatured ? "left-7" : "left-1"}`} />
        </button>
      </div>

      {/* Featured Image */}
      <div>
        <label className={labelClass}>Featured Image</label>
        {imagePreview ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 mb-3 group">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => { setImageFile(null); setImagePreview("") }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full items-center justify-center hidden group-hover:flex shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000] transition"
          >
            <ImageIcon className="w-7 h-7" />
            <span className="text-sm font-bold">Click to upload a featured image</span>
            <span className="text-xs">JPG, PNG, WebP — Max 20MB</span>
          </button>
        )}
        {imagePreview && (
          <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-[#8B0000] font-bold underline mt-1">
            Change image
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/jpg,image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageChange} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-xl bg-[#8B0000] text-white font-bold text-sm hover:bg-[#700000] transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting
            ? <><Loader2 className="w-4 h-4 animate-spin" />{submitLabel === "Create Article" ? "Creating..." : "Saving..."}</>
            : submitLabel}
        </button>
      </div>
    </form>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
const statusStyle = (s: string) =>
  s === "published" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"

const categoryStyle = (c: string) => {
  const map: Record<string, string> = {
    news: "bg-blue-50 text-blue-600",
    events: "bg-purple-50 text-purple-600",
    research: "bg-teal-50 text-teal-700",
    campus: "bg-orange-50 text-orange-600",
    achievement: "bg-yellow-50 text-yellow-700",
  }
  return map[c] || "bg-gray-100 text-gray-500"
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<NewsItem | null>(null)
  const [showDelete, setShowDelete] = useState<NewsItem | null>(null)

  const [createError, setCreateError] = useState("")
  const [editError, setEditError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  const fetchNews = async () => {
    try {
      const response = await api.getNews()
      if (response?.success) setNews(response.data)
    } catch (e) {
      console.error("Failed to fetch news", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchNews() }, [])

  // ── Create ──
  const handleCreate = async (fd: FormData) => {
    setIsSubmitting(true)
    setCreateError("")
    try {
      const res = await fetch("http://localhost:8000/api/news", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) {
        const detailErrors = data?.errors ? Object.values(data.errors).flat().join(" ") : null
        throw new Error(detailErrors || data?.message || "Failed to create article")
      }
      setNews(prev => [data.data, ...prev])
      setShowCreate(false)
      showToast("Article created successfully!")
    } catch (err: any) {
      setCreateError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Edit ──
  const handleEdit = async (fd: FormData) => {
    if (!showEdit) return
    setIsSubmitting(true)
    setEditError("")
    try {
      fd.append("_method", "PUT")
      const res = await fetch(`http://localhost:8000/api/news/${showEdit.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) {
        const detailErrors = data?.errors ? Object.values(data.errors).flat().join(" ") : null
        throw new Error(detailErrors || data?.message || "Failed to update article")
      }
      setNews(prev => prev.map(n => (n.id === showEdit.id ? data.data : n)))
      setShowEdit(null)
      showToast("Article updated successfully!")
    } catch (err: any) {
      setEditError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Publish / Unpublish ──
  const handlePublishToggle = async (item: NewsItem) => {
    const endpoint = item.status === "published"
      ? `http://localhost:8000/api/news/${item.id}/unpublish`
      : `http://localhost:8000/api/news/${item.id}/publish`
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (data?.success) {
        setNews(prev => prev.map(n => (n.id === item.id ? data.data : n)))
        showToast(item.status === "published" ? "Article moved to drafts." : "Article published!")
      }
    } catch {
      showToast("Failed to update article status", "error")
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const res = await fetch(`http://localhost:8000/api/news/${showDelete.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to delete")
      setNews(prev => prev.filter(n => n.id !== showDelete.id))
      setShowDelete(null)
      showToast("Article deleted successfully!")
    } catch (err: any) {
      showToast(err.message || "Failed to delete article", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">News & Events</h1>
            <p className="text-gray-500 font-medium mt-1">Publish and manage university news, announcements, and upcoming events.</p>
          </div>
          <button
            onClick={() => { setCreateError(""); setShowCreate(true) }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-2xl font-bold hover:bg-[#700000] transition-all shadow-lg shadow-red-900/10"
          >
            <Plus className="w-5 h-5" />
            Create Article
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="flex items-center text-xs font-bold text-gray-400">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Title & Excerpt</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Published</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-bold text-gray-400">Loading articles...</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                          <Newspaper className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-medium">
                          {search ? `No articles matching "${search}"` : "No articles found. Create your first one!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Title */}
                      <td className="px-8 py-5">
                        <div className="max-w-sm">
                          <p className="font-bold text-sm text-[#1A0A00] mb-1 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>
                        </div>
                      </td>
                      {/* Category */}
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${categoryStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      {/* Status — click to toggle */}
                      <td className="px-8 py-5">
                        <button
                          onClick={() => handlePublishToggle(item)}
                          title={item.status === "published" ? "Click to unpublish" : "Click to publish"}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition hover:opacity-80 ${statusStyle(item.status)}`}
                        >
                          {item.status}
                        </button>
                      </td>
                      {/* Published date */}
                      <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                        {item.published_at ? new Date(item.published_at).toLocaleDateString() : "—"}
                      </td>
                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.slug && (
                            <Link
                              href={`/news/${item.slug}`}
                              target="_blank"
                              className="p-2 hover:bg-gray-50 text-gray-400 rounded-lg transition-colors"
                              title="View on site"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          <button
                            onClick={() => { setEditError(""); setShowEdit(item) }}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDelete(item)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Create New Article" onClose={() => setShowCreate(false)}>
          <ArticleForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            isSubmitting={isSubmitting}
            error={createError}
            submitLabel="Create Article"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Article" onClose={() => setShowEdit(null)}>
          <ArticleForm
            initialData={showEdit}
            onSubmit={handleEdit}
            onCancel={() => setShowEdit(null)}
            isSubmitting={isSubmitting}
            error={editError}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <ConfirmDialog
          name={showDelete.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(null)}
          isLoading={isDeleting}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
