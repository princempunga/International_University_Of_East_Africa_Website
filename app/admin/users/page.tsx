"use client"

import { useState, useEffect } from "react"
import {
  Users, Plus, Shield, ShieldCheck, Mail, Trash2,
  ToggleLeft, ToggleRight, X, Loader2, CheckCircle2,
  AlertTriangle, Eye, EyeOff, Lock, User as UserIcon
} from "lucide-react"
import api from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────
type Admin = {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
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
      <div className="bg-white rounded-[24px] w-full max-w-[480px] shadow-2xl">
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

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ name, onConfirm, onCancel, isLoading }: { name: string; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[420px] shadow-2xl p-8">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Admin?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <strong>"{name}"</strong>? This action cannot be undone and the admin will lose all access.
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

// ─── Add Admin Form ───────────────────────────────────────────────────────────
function AddAdminForm({ onSubmit, onCancel, isSubmitting, error }: {
  onSubmit: (data: { name: string; email: string; password: string }) => void
  onCancel: () => void
  isSubmitting: boolean
  error: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#1A0A00]/20 focus:border-[#1A0A00] transition"
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ name, email, password }) }} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
        <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 font-medium">
          This account will be created with <strong>Admin</strong> role. Only Super Admins can create and manage admin accounts.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input required type="text" placeholder="e.g. John Mukasa" className={`${inputClass} pl-10`} value={name} onChange={e => setName(e.target.value)} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input required type="email" placeholder="admin@iuea.ac.ug" className={`${inputClass} pl-10`} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className={labelClass}>Password <span className="text-red-500">*</span></label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            minLength={8}
            className={`${inputClass} pl-10 pr-10`}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Must be at least 8 characters long.</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-xl bg-[#1A0A00] text-[#E8B84B] font-bold text-sm hover:bg-[#2D1B00] transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Plus className="w-4 h-4" /> Create Admin</>}
        </button>
      </div>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { role } = useAuth()
  const router = useRouter()

  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState<Admin | null>(null)

  const [createError, setCreateError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  useEffect(() => {
    if (role && role !== "super_admin") {
      router.push("/admin/dashboard")
      return
    }
    const fetchAdmins = async () => {
      try {
        const response = await api.getAdmins()
        if (response?.success) setAdmins(response.data)
      } catch { console.error("Failed to fetch admins") }
      finally { setIsLoading(false) }
    }
    fetchAdmins()
  }, [role, router])

  if (role !== "super_admin") return null

  // ── Create ──
  const handleCreate = async (data: { name: string; email: string; password: string }) => {
    setIsSubmitting(true)
    setCreateError("")
    try {
      const res = await fetch("http://localhost:8000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || Object.values(json?.errors || {}).flat().join(" ") || "Failed to create admin")
      setAdmins(prev => [...prev, json.data])
      setShowCreate(false)
      showToast(`Admin "${data.name}" created successfully!`)
    } catch (err: any) {
      setCreateError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Toggle Status ──
  const handleToggle = async (admin: Admin) => {
    setTogglingId(admin.id)
    try {
      const res = await fetch(`http://localhost:8000/api/admins/${admin.id}/toggle`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || "Failed to update status")
      setAdmins(prev => prev.map(a => a.id === admin.id ? json.data : a))
      showToast(`${admin.name} has been ${json.data.is_active ? "activated" : "deactivated"}.`)
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status", "error")
    } finally {
      setTogglingId(null)
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const res = await fetch(`http://localhost:8000/api/admins/${showDelete.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || "Delete failed")
      setAdmins(prev => prev.filter(a => a.id !== showDelete.id))
      setShowDelete(null)
      showToast("Admin account deleted.")
    } catch (err: any) {
      showToast(err.message || "Failed to delete admin", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const activeCount = admins.filter(a => a.is_active).length

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Manage Admins</h1>
            <p className="text-gray-500 font-medium mt-1">
              Add, remove, or deactivate administrative accounts.
              <span className="ml-2 font-bold text-[#1A0A00]">{activeCount} active</span> of <span className="font-bold">{admins.length} total</span>
            </p>
          </div>
          <button
            onClick={() => { setCreateError(""); setShowCreate(true) }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A0A00] text-[#E8B84B] rounded-2xl font-bold hover:bg-[#2D1B00] transition-all shadow-lg shadow-black/10"
          >
            <Plus className="w-5 h-5" />
            Add New Admin
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Admin Name</th>
                  <th className="px-8 py-4">Email Address</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Joined</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#1A0A00] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-bold text-gray-400">Loading admin accounts...</p>
                      </div>
                    </td>
                  </tr>
                ) : admins.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-gray-400 font-medium">No admin accounts found.</p>
                        <button
                          onClick={() => { setCreateError(""); setShowCreate(true) }}
                          className="text-sm text-[#8B0000] font-bold hover:underline"
                        >
                          + Add the first admin
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  admins.map(admin => (
                    <tr key={admin.id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Name */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1A0A00] flex items-center justify-center text-[#E8B84B] font-black text-xs uppercase shrink-0">
                            {admin.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                          </div>
                          <p className="font-bold text-sm text-[#1A0A00]">{admin.name}</p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Mail className="w-4 h-4 text-gray-300 shrink-0" />
                          {admin.email}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          {admin.role === "super_admin"
                            ? <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
                            : <Shield className="w-4 h-4 text-[#E8B84B]" />
                          }
                          <span className={`text-[10px] font-black uppercase tracking-wider ${admin.role === "super_admin" ? "text-[#8B0000]" : "text-[#1A0A00]"}`}>
                            {admin.role.replace("_", " ")}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          admin.is_active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                        }`}>
                          {admin.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                        {new Date(admin.created_at).toLocaleDateString()}
                      </td>

                      {/* Actions — only for non-super_admin accounts */}
                      <td className="px-8 py-5 text-right">
                        {admin.role !== "super_admin" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggle(admin)}
                              disabled={togglingId === admin.id}
                              className="p-2 hover:bg-gray-50 text-gray-400 rounded-lg transition-colors disabled:opacity-50"
                              title={admin.is_active ? "Deactivate" : "Activate"}
                            >
                              {togglingId === admin.id
                                ? <Loader2 className="w-5 h-5 animate-spin" />
                                : admin.is_active
                                  ? <ToggleRight className="w-6 h-6 text-green-500" />
                                  : <ToggleLeft className="w-6 h-6 text-gray-400" />
                              }
                            </button>
                            <button
                              onClick={() => setShowDelete(admin)}
                              className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300 font-bold px-4">—</span>
                        )}
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
        <Modal title="Add New Admin" onClose={() => setShowCreate(false)}>
          <AddAdminForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            isSubmitting={isSubmitting}
            error={createError}
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
