"use client"

import { useState, useEffect, useRef } from "react"
import { Package, Plus, Search, Edit, Trash2, X, Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, ToggleLeft, ToggleRight } from "lucide-react"
import api from "@/lib/api"
import Image from "next/image"

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = { id: number; name: string }
type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock_quantity: number
  status: "active" | "inactive" | "out_of_stock"
  is_featured: boolean
  images: string[]
  category?: Category
  category_id?: number
}

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
      <div className="bg-white rounded-[24px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-7 pb-5 border-b border-gray-100">
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
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Product?</h2>
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

// ─── Product Form ─────────────────────────────────────────────────────────────
function ProductForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  submitLabel,
}: {
  initialData?: Partial<Product>
  categories: Category[]
  onSubmit: (fd: FormData) => void
  onCancel: () => void
  isSubmitting: boolean
  error: string
  submitLabel: string
}) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [price, setPrice] = useState(initialData?.price?.toString() || "")
  const [stock, setStock] = useState(initialData?.stock_quantity?.toString() || "")
  const [categoryId, setCategoryId] = useState(initialData?.category_id?.toString() || initialData?.category?.id?.toString() || "")
  const [status, setStatus] = useState<string>(initialData?.status || "active")
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || [])
  const fileRef = useRef<HTMLInputElement>(null)

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setImageFiles(prev => [...prev, ...files])
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== (index - (imagePreviews.length - imageFiles.length))))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append("name", name)
    fd.append("description", description)
    fd.append("price", price)
    fd.append("stock_quantity", stock)
    fd.append("category_id", categoryId)
    fd.append("status", status)
    fd.append("is_featured", isFeatured ? "1" : "0")
    imageFiles.forEach(f => fd.append("images[]", f))
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

      {/* Name */}
      <div>
        <label className={labelClass}>Product Name <span className="text-red-500">*</span></label>
        <input required type="text" placeholder="e.g. IUEA Branded Hoodie" className={inputClass} value={name} onChange={e => setName(e.target.value)} />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description <span className="text-red-500">*</span></label>
        <textarea required rows={3} placeholder="Product description..." className={`${inputClass} resize-none`} value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (UGX) <span className="text-red-500">*</span></label>
          <input required type="number" min="0" placeholder="e.g. 50000" className={inputClass} value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Stock Quantity <span className="text-red-500">*</span></label>
          <input required type="number" min="0" placeholder="e.g. 100" className={inputClass} value={stock} onChange={e => setStock(e.target.value)} />
        </div>
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category <span className="text-red-500">*</span></label>
          <select required className={inputClass} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={inputClass} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-bold text-[#1A0A00]">Featured Product</p>
          <p className="text-xs text-gray-400">Show on the homepage and top of shop</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFeatured(v => !v)}
          className={`relative w-12 h-6 rounded-full transition-colors ${isFeatured ? "bg-[#8B0000]" : "bg-gray-200"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isFeatured ? "left-7" : "left-1"}`} />
        </button>
      </div>

      {/* Images */}
      <div>
        <label className={labelClass}>Product Images {!initialData?.id && <span className="text-red-500">*</span>}</label>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                <Image src={src} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full items-center justify-center hidden group-hover:flex shadow"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000] transition"
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-sm font-bold">Click to upload images</span>
          <span className="text-xs">JPG, PNG, WebP — Max 5MB each</span>
        </button>
        <input ref={fileRef} type="file" multiple accept="image/jpg,image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageChange} />
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
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" />{submitLabel === "Add Product" ? "Adding..." : "Saving..."}</>
          ) : submitLabel}
        </button>
      </div>
    </form>
  )
}

// ─── Status badge helper ──────────────────────────────────────────────────────
const statusStyle = (s: string) => {
  if (s === "active") return "bg-green-100 text-green-700"
  if (s === "out_of_stock") return "bg-amber-100 text-amber-700"
  return "bg-gray-100 text-gray-500"
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<Product | null>(null)
  const [showDelete, setShowDelete] = useState<Product | null>(null)

  const [createError, setCreateError] = useState("")
  const [editError, setEditError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })

  const fetchAll = async () => {
    try {
      const [pRes, cRes] = await Promise.all([api.getProducts(), fetch("http://localhost:8000/api/categories").then(r => r.json())])
      if (pRes?.success) setProducts(pRes.data)
      if (cRes?.success) setCategories(cRes.data)
    } catch (e) {
      console.error("Failed to load data", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  // ── Create ──
  const handleCreate = async (fd: FormData) => {
    setIsSubmitting(true)
    setCreateError("")
    try {
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Failed to create product")
      setProducts(prev => [data.data, ...prev])
      setShowCreate(false)
      showToast("Product added successfully!")
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
      // Laravel doesn't support multipart PUT, use POST with _method override
      fd.append("_method", "PUT")
      const res = await fetch(`http://localhost:8000/api/products/${showEdit.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Failed to update product")
      setProducts(prev => prev.map(p => (p.id === showEdit.id ? data.data : p)))
      setShowEdit(null)
      showToast("Product updated successfully!")
    } catch (err: any) {
      setEditError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Toggle Status ──
  const handleToggleStatus = async (product: Product) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:8000/api/products/${product.id}/status`, {
        method: "POST",
        headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      })
      const data = await res.json()
      if (data?.success) {
        setProducts(prev => prev.map(p => (p.id === product.id ? data.data : p)))
        showToast(`Status changed to "${data.data.status}"`)
      }
    } catch {
      showToast("Failed to toggle status", "error")
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:8000/api/products/${showDelete.id}`, {
        method: "DELETE",
        headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to delete")
      setProducts(prev => prev.filter(p => p.id !== showDelete.id))
      setShowDelete(null)
      showToast("Product deleted successfully!")
    } catch (err: any) {
      showToast(err.message || "Failed to delete product", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Shop Products</h1>
            <p className="text-gray-500 font-medium mt-1">Manage your university merchandise and academic materials.</p>
          </div>
          <button
            onClick={() => { setCreateError(""); setShowCreate(true) }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-2xl font-bold hover:bg-[#700000] transition-all shadow-lg shadow-red-900/10"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          {/* Search bar */}
          <div className="p-6 border-b border-gray-50 flex gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="flex items-center text-xs font-bold text-gray-400">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Stock</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-bold text-gray-400">Loading products...</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-medium">
                          {search ? `No products matching "${search}"` : "No products found. Start by adding one!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Product */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-50 shrink-0">
                            {product.images?.[0] ? (
                              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#1A0A00]">{product.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      {/* Category */}
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-wider">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="px-8 py-5 font-bold text-sm text-[#1A0A00]">
                        UGX {product.price?.toLocaleString()}
                      </td>
                      {/* Stock */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock_quantity > 10 ? "bg-green-500" : product.stock_quantity > 0 ? "bg-amber-500" : "bg-red-500"}`} />
                          <span className="text-sm font-bold text-gray-600">{product.stock_quantity} in stock</span>
                        </div>
                      </td>
                      {/* Status */}
                      <td className="px-8 py-5">
                        <button
                          onClick={() => handleToggleStatus(product)}
                          title="Click to toggle status"
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition hover:opacity-80 ${statusStyle(product.status)}`}
                        >
                          {product.status.replace("_", " ")}
                        </button>
                      </td>
                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditError(""); setShowEdit(product) }}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDelete(product)}
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
        <Modal title="Add New Product" onClose={() => setShowCreate(false)}>
          <ProductForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            isSubmitting={isSubmitting}
            error={createError}
            submitLabel="Add Product"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Product" onClose={() => setShowEdit(null)}>
          <ProductForm
            initialData={showEdit}
            categories={categories}
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
          name={showDelete.name}
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
