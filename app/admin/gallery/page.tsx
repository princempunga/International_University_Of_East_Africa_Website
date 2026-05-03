"use client"

import { useState, useEffect, useRef } from "react"
import { Images, Plus, Trash2, Edit, X, Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, ZoomIn, Tag } from "lucide-react"
import Image from "next/image"

// ─── Types ────────────────────────────────────────────────────────────────────
type GalleryImage = {
  id: number
  title: string
  alt_text: string
  category: string
  image_path: string
  thumbnail_path?: string
  is_featured: boolean
  sort_order?: number
}

const CATEGORIES = ["all", "campus", "graduation", "events", "labs", "sports", "general"] as const
type Category = typeof CATEGORIES[number]

const CATEGORY_COLORS: Record<string, string> = {
  campus: "bg-blue-100 text-blue-700",
  graduation: "bg-purple-100 text-purple-700",
  events: "bg-orange-100 text-orange-700",
  labs: "bg-teal-100 text-teal-700",
  sports: "bg-green-100 text-green-700",
  general: "bg-gray-100 text-gray-600",
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
      <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <div className="relative w-full max-h-[75vh] rounded-2xl overflow-hidden">
          <img src={image.image_path} alt={image.alt_text} className="w-full h-full object-contain max-h-[70vh]" />
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">{image.title}</p>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${CATEGORY_COLORS[image.category] || "bg-gray-100 text-gray-600"}`}>
            {image.category}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[540px] max-h-[90vh] overflow-y-auto shadow-2xl">
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
function ConfirmDialog({ title, onConfirm, onCancel, isLoading }: { title: string; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl p-8">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Image?</h2>
        <p className="text-sm text-gray-500 mb-6">
          This will permanently delete <strong>"{title}"</strong> from the gallery. This cannot be undone.
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

// ─── Upload Form ──────────────────────────────────────────────────────────────
function GalleryForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  submitLabel,
}: {
  initialData?: Partial<GalleryImage>
  onSubmit: (fd: FormData) => void
  onCancel: () => void
  isSubmitting: boolean
  error: string
  submitLabel: string
}) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [altText, setAltText] = useState(initialData?.alt_text || "")
  const [category, setCategory] = useState(initialData?.category || "general")
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(initialData?.image_path || "")
  const fileRef = useRef<HTMLInputElement>(null)

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    // Auto-fill alt text from file name if empty
    if (!altText) setAltText(file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append("title", title)
    fd.append("alt_text", altText)
    fd.append("category", category)
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

      {/* Image Upload */}
      <div>
        <label className={labelClass}>Image {!initialData?.id && <span className="text-red-500">*</span>}</label>
        {imagePreview ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 mb-3 group">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => { setImageFile(null); setImagePreview(initialData?.image_path || "") }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full items-center justify-center hidden group-hover:flex shadow"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 text-white text-xs font-bold rounded-lg hidden group-hover:flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3" /> Change
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000] transition"
          >
            <ImageIcon className="w-8 h-8" />
            <span className="text-sm font-bold">Click to select an image</span>
            <span className="text-xs">JPG, PNG, WebP — Max 5MB</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/jpg,image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />
      </div>

      {/* Title */}
      <div>
        <label className={labelClass}>Title <span className="text-red-500">*</span></label>
        <input required type="text" placeholder='e.g. "Students at Graduation Ceremony"' className={inputClass} value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      {/* Alt Text */}
      <div>
        <label className={labelClass}>Alt Text <span className="text-red-500">*</span></label>
        <input required type="text" placeholder="Descriptive text for accessibility" className={inputClass} value={altText} onChange={e => setAltText(e.target.value)} />
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Category <span className="text-red-500">*</span></label>
        <select required className={inputClass} value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.filter(c => c !== "all").map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Featured toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-bold text-[#1A0A00]">Featured Image</p>
          <p className="text-xs text-gray-400">Show on the public gallery homepage</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFeatured(v => !v)}
          className={`relative w-12 h-6 rounded-full transition-colors ${isFeatured ? "bg-[#8B0000]" : "bg-gray-200"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isFeatured ? "left-7" : "left-1"}`} />
        </button>
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
            ? <><Loader2 className="w-4 h-4 animate-spin" />{submitLabel === "Upload Image" ? "Uploading..." : "Saving..."}</>
            : submitLabel}
        </button>
      </div>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const [showUpload, setShowUpload] = useState(false)
  const [showEdit, setShowEdit] = useState<GalleryImage | null>(null)
  const [showDelete, setShowDelete] = useState<GalleryImage | null>(null)
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const [uploadError, setUploadError] = useState("")
  const [editError, setEditError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  const fetchGallery = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/gallery")
      const data = await res.json()
      if (data?.success) setImages(data.data)
    } catch (e) {
      console.error("Failed to fetch gallery", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchGallery() }, [])

  // ── Upload ──
  const handleUpload = async (fd: FormData) => {
    setIsSubmitting(true)
    setUploadError("")
    try {
      const res = await fetch("http://localhost:8000/api/gallery", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Upload failed")
      setImages(prev => [data.data, ...prev])
      setShowUpload(false)
      showToast("Image uploaded successfully!")
    } catch (err: any) {
      setUploadError(err.message)
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
      const res = await fetch(`http://localhost:8000/api/gallery/${showEdit.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Update failed")
      setImages(prev => prev.map(img => (img.id === showEdit.id ? data.data : img)))
      setShowEdit(null)
      showToast("Image updated successfully!")
    } catch (err: any) {
      setEditError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const res = await fetch(`http://localhost:8000/api/gallery/${showDelete.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Delete failed")
      setImages(prev => prev.filter(img => img.id !== showDelete.id))
      setShowDelete(null)
      showToast("Image deleted successfully!")
    } catch (err: any) {
      showToast(err.message || "Failed to delete image", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = activeCategory === "all" ? images : images.filter(img => img.category === activeCategory)

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "all" ? images.length : images.filter(img => img.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Gallery</h1>
            <p className="text-gray-500 font-medium mt-1">
              Manage and upload university photos. {images.length} image{images.length !== 1 ? "s" : ""} total.
            </p>
          </div>
          <button
            onClick={() => { setUploadError(""); setShowUpload(true) }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-2xl font-bold hover:bg-[#700000] transition-all shadow-lg shadow-red-900/10"
          >
            <Plus className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#8B0000] text-white shadow-md"
                  : "bg-white text-gray-500 border border-gray-100 hover:border-[#8B0000] hover:text-[#8B0000]"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              <span className={`ml-2 text-[10px] font-black ${activeCategory === cat ? "opacity-70" : "text-gray-400"}`}>
                {categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-gray-400">Loading gallery...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-5">
              <Images className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-400 mb-2">No images yet</h3>
            <p className="text-sm text-gray-300">
              {activeCategory !== "all" ? `No images in the "${activeCategory}" category.` : 'Click "Upload Image" to add the first photo.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(image => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={image.image_path}
                  alt={image.alt_text}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-between p-3">
                  {/* Top badges */}
                  <div className="flex items-start justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${CATEGORY_COLORS[image.category] || "bg-gray-100 text-gray-600"}`}>
                      {image.category}
                    </span>
                    {image.is_featured && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-yellow-400 text-yellow-900">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Bottom actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-bold line-clamp-1 mb-2 drop-shadow">{image.title}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLightboxImage(image)}
                        className="flex-1 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <ZoomIn className="w-3 h-3" /> View
                      </button>
                      <button
                        onClick={() => { setEditError(""); setShowEdit(image) }}
                        className="p-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setShowDelete(image)}
                        className="p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <Modal title="Upload New Image" onClose={() => setShowUpload(false)}>
          <GalleryForm
            onSubmit={handleUpload}
            onCancel={() => setShowUpload(false)}
            isSubmitting={isSubmitting}
            error={uploadError}
            submitLabel="Upload Image"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Image" onClose={() => setShowEdit(null)}>
          <GalleryForm
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
          title={showDelete.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(null)}
          isLoading={isDeleting}
        />
      )}

      {/* Lightbox */}
      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
