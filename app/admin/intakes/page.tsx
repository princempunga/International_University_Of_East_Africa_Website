"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Plus, MoreVertical, CheckCircle2, Clock, X, Loader2, Edit2, Trash2, PlayCircle, XCircle, AlertTriangle } from "lucide-react"
import api from "@/lib/api"

// ─── Types ────────────────────────────────────────────────────────────────────
type Intake = {
  id: number
  name: string
  description?: string
  start_date: string
  end_date: string
  application_deadline: string
  max_students?: number
  status: "draft" | "active" | "closed"
}

type IntakeFormData = {
  name: string
  description: string
  start_date: string
  end_date: string
  application_deadline: string
  max_students: string
  status: "draft" | "active" | "closed"
}

const emptyForm: IntakeFormData = {
  name: "",
  description: "",
  start_date: "",
  end_date: "",
  application_deadline: "",
  max_students: "",
  status: "draft",
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm transition-all ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ─── Shared Form Fields ───────────────────────────────────────────────────────
function IntakeForm({
  form,
  setForm,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  form: IntakeFormData
  setForm: (f: IntakeFormData) => void
  error: string
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  submitLabel: string
}) {
  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition"
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className={labelClass}>Intake Name <span className="text-red-500">*</span></label>
        <input
          required
          type="text"
          placeholder="e.g. January 2026 Intake"
          className={inputClass}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={3}
          placeholder="Brief description of this intake"
          className={`${inputClass} resize-none`}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Date <span className="text-red-500">*</span></label>
          <input required type="date" className={inputClass} value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>End Date <span className="text-red-500">*</span></label>
          <input required type="date" className={inputClass} value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Application Deadline <span className="text-red-500">*</span></label>
          <input required type="date" className={inputClass} value={form.application_deadline} onChange={e => setForm({ ...form, application_deadline: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Max Students <span className="text-red-500">*</span></label>
          <input
            required
            type="number"
            min={1}
            placeholder="e.g. 1000"
            className={inputClass}
            value={form.max_students}
            onChange={e => setForm({ ...form, max_students: e.target.value })}
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className={labelClass}>Status</label>
        <select
          className={inputClass}
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value as IntakeFormData["status"] })}
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-xl bg-[#8B0000] text-white font-bold text-sm hover:bg-[#700000] transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {submitLabel === "Create Intake" ? "Creating..." : "Saving..."}
            </>
          ) : submitLabel}
        </button>
      </div>
    </form>
  )
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl">
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

// ─── Confirm Delete Dialog ────────────────────────────────────────────────────
function ConfirmDialog({ intake, onConfirm, onCancel, isLoading }: { intake: Intake; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[420px] shadow-2xl p-8">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Intake?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <strong>"{intake.name}"</strong>? This action cannot be undone.
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

// ─── Intake Card Menu ─────────────────────────────────────────────────────────
function IntakeCardMenu({
  intake,
  onEdit,
  onActivate,
  onClose: onCloseIntake,
  onDelete,
}: {
  intake: Intake
  onEdit: () => void
  onActivate: () => void
  onClose: () => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-30 py-1">
          <button
            onClick={() => { setOpen(false); onEdit() }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#1A0A00] font-medium hover:bg-gray-50 transition"
          >
            <Edit2 className="w-4 h-4 text-gray-400" /> Edit Intake
          </button>
          {intake.status !== "active" && (
            <button
              onClick={() => { setOpen(false); onActivate() }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-green-700 font-medium hover:bg-green-50 transition"
            >
              <PlayCircle className="w-4 h-4" /> Activate
            </button>
          )}
          {intake.status === "active" && (
            <button
              onClick={() => { setOpen(false); onCloseIntake() }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-orange-700 font-medium hover:bg-orange-50 transition"
            >
              <XCircle className="w-4 h-4" /> Close Intake
            </button>
          )}
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { setOpen(false); onDelete() }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function IntakesPage() {
  const [intakes, setIntakes] = useState<Intake[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState<Intake | null>(null)
  const [showDelete, setShowDelete] = useState<Intake | null>(null)

  const [createForm, setCreateForm] = useState<IntakeFormData>(emptyForm)
  const [editForm, setEditForm] = useState<IntakeFormData>(emptyForm)

  const [createError, setCreateError] = useState("")
  const [editError, setEditError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type })
  }

  const fetchIntakes = async () => {
    try {
      const response = await api.getIntakes()
      if (response?.success) setIntakes(response.data)
    } catch (e) {
      console.error("Failed to fetch intakes", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchIntakes() }, [])

  // ── Create ──
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setCreateError("")
    try {
      const token = localStorage.getItem("iuea_token")
      const res = await fetch("http://localhost:8000/api/intakes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: createForm.name,
          description: createForm.description,
          start_date: createForm.start_date,
          end_date: createForm.end_date,
          application_deadline: createForm.application_deadline,
          max_students: createForm.max_students ? parseInt(createForm.max_students) : undefined,
          status: createForm.status,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Failed to create intake")
      setIntakes(prev => [data.data, ...prev])
      setShowCreate(false)
      setCreateForm(emptyForm)
      showToast("Intake created successfully!")
    } catch (err: any) {
      setCreateError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Edit ──
  const openEdit = (intake: Intake) => {
    setEditForm({
      name: intake.name,
      description: intake.description || "",
      start_date: intake.start_date?.slice(0, 10) || "",
      end_date: intake.end_date?.slice(0, 10) || "",
      application_deadline: intake.application_deadline?.slice(0, 10) || "",
      max_students: intake.max_students?.toString() || "",
      status: intake.status,
    })
    setEditError("")
    setShowEdit(intake)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showEdit) return
    setIsSubmitting(true)
    setEditError("")
    try {
      const token = localStorage.getItem("iuea_token")
      const res = await fetch(`http://localhost:8000/api/intakes/${showEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          start_date: editForm.start_date,
          end_date: editForm.end_date,
          application_deadline: editForm.application_deadline,
          max_students: editForm.max_students ? parseInt(editForm.max_students) : undefined,
          status: editForm.status,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || Object.values(data?.errors || {}).flat().join(" ") || "Failed to update intake")
      setIntakes(prev => prev.map(i => (i.id === showEdit.id ? data.data : i)))
      setShowEdit(null)
      showToast("Intake updated successfully!")
    } catch (err: any) {
      setEditError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Activate ──
  const handleActivate = async (intake: Intake) => {
    try {
      const res = await api.activateIntake(intake.id)
      if (res?.success) {
        await fetchIntakes()
        showToast(`"${intake.name}" is now active!`)
      }
    } catch {
      showToast("Failed to activate intake", "error")
    }
  }

  // ── Close ──
  const handleCloseIntake = async (intake: Intake) => {
    try {
      const token = localStorage.getItem("iuea_token")
      const res = await fetch(`http://localhost:8000/api/intakes/${intake.id}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      const data = await res.json()
      if (data?.success) {
        setIntakes(prev => prev.map(i => (i.id === intake.id ? { ...i, status: "closed" } : i)))
        showToast(`"${intake.name}" has been closed.`)
      }
    } catch {
      showToast("Failed to close intake", "error")
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const token = localStorage.getItem("iuea_token")
      const res = await fetch(`http://localhost:8000/api/intakes/${showDelete.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to delete")
      setIntakes(prev => prev.filter(i => i.id !== showDelete.id))
      setShowDelete(null)
      showToast("Intake deleted successfully!")
    } catch (err: any) {
      showToast(err.message || "Failed to delete intake", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  // ─── Status badge helper ───────────────────────────────────────────────────
  const statusBadge = (status: string) => {
    if (status === "active") return "bg-green-100 text-green-700"
    if (status === "closed") return "bg-red-100 text-red-600"
    return "bg-gray-100 text-gray-500"
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Academic Intakes</h1>
            <p className="text-gray-500 font-medium mt-1">Manage enrollment periods and application deadlines.</p>
          </div>
          <button
            onClick={() => { setCreateForm(emptyForm); setCreateError(""); setShowCreate(true) }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-2xl font-bold hover:bg-[#700000] transition-all shadow-lg shadow-red-900/10"
          >
            <Plus className="w-5 h-5" />
            Create Intake
          </button>
        </div>

        {/* Intakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-gray-400">Loading intakes...</p>
            </div>
          ) : intakes.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">No intakes scheduled yet.</p>
              <p className="text-sm text-gray-300 mt-1">Click "+ Create Intake" to add the first one.</p>
            </div>
          ) : (
            intakes.map(intake => (
              <div key={intake.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${intake.status === "active" ? "bg-green-50 text-green-600" : intake.status === "closed" ? "bg-red-50 text-red-400" : "bg-gray-50 text-gray-400"}`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusBadge(intake.status)}`}>
                      {intake.status}
                    </span>
                    <IntakeCardMenu
                      intake={intake}
                      onEdit={() => openEdit(intake)}
                      onActivate={() => handleActivate(intake)}
                      onClose={() => handleCloseIntake(intake)}
                      onDelete={() => setShowDelete(intake)}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">{intake.name}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{intake.description || "No description provided."}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">Start Date</span>
                    <span className="text-[#1A0A00] font-bold">{new Date(intake.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">End Date</span>
                    <span className="text-[#1A0A00] font-bold">{new Date(intake.end_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">Deadline</span>
                    <span className="text-red-500 font-bold">{new Date(intake.application_deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">Max Students</span>
                    <span className="text-[#1A0A00] font-bold">{intake.max_students ?? "—"}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2">
                  {intake.status === "active" ? (
                    <><CheckCircle2 className="w-4 h-4 text-green-600" /><span className="text-xs font-black uppercase tracking-widest text-green-600">Enrollment Open</span></>
                  ) : intake.status === "closed" ? (
                    <><XCircle className="w-4 h-4 text-red-400" /><span className="text-xs font-black uppercase tracking-widest text-red-400">Closed</span></>
                  ) : (
                    <><Clock className="w-4 h-4 text-gray-400" /><span className="text-xs font-black uppercase tracking-widest text-gray-400">Draft</span></>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Create New Intake" onClose={() => setShowCreate(false)}>
          <IntakeForm
            form={createForm}
            setForm={setCreateForm}
            error={createError}
            isSubmitting={isSubmitting}
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            submitLabel="Create Intake"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Intake" onClose={() => setShowEdit(null)}>
          <IntakeForm
            form={editForm}
            setForm={setEditForm}
            error={editError}
            isSubmitting={isSubmitting}
            onSubmit={handleEdit}
            onCancel={() => setShowEdit(null)}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <ConfirmDialog
          intake={showDelete}
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
