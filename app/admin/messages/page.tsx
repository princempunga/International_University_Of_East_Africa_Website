"use client"

import { useState, useEffect } from "react"
import {
  Mail, MailOpen, Trash2, Reply, Search, X, Loader2,
  CheckCircle2, AlertTriangle, Clock, User, AtSign, BookOpen,
  RefreshCw, Inbox
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Contact = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  reply_message?: string
  replied_at?: string
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

// ─── Confirm Delete ───────────────────────────────────────────────────────────
function ConfirmDialog({ onConfirm, onCancel, isLoading }: { onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl p-8">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#1A0A00] mb-2">Delete Message?</h2>
        <p className="text-sm text-gray-500 mb-6">This message will be permanently deleted. This cannot be undone.</p>
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

// ─── Status pill ─────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, string> = {
  unread: "bg-[#8B0000] text-white",
  read: "bg-gray-100 text-gray-500",
  replied: "bg-green-100 text-green-700",
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  unread: <Mail className="w-3 h-3" />,
  read: <MailOpen className="w-3 h-3" />,
  replied: <CheckCircle2 className="w-3 h-3" />,
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return "Just now"
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  if (d < 7) return `${d}d ago`
  return new Date(dateStr).toLocaleDateString()
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all")

  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [replyError, setReplyError] = useState("")

  const [showDelete, setShowDelete] = useState<Contact | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  const fetchContacts = async (quiet = false) => {
    if (!quiet) setIsLoading(true)
    else setIsRefreshing(true)
    try {
      const res = await fetch("http://localhost:8000/api/contacts", {
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (data?.success) setContacts(data.data)
    } catch (e) {
      console.error("Failed to fetch contacts", e)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  // ── Open a message (mark as read) ──
  const openMessage = async (contact: Contact) => {
    setSelected(contact)
    setReplyText("")
    setReplyError("")

    if (contact.status === "unread") {
      try {
        const res = await fetch(`http://localhost:8000/api/contacts/${contact.id}`, {
          headers: {
            Accept: "application/json",
            ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
          },
        })
        const data = await res.json()
        if (data?.success) {
          setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, status: "read" } : c))
          setSelected(data.data)
        }
      } catch { /* ignore */ }
    }
  }

  // ── Reply ──
  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected || !replyText.trim()) return
    setIsSending(true)
    setReplyError("")
    try {
      const res = await fetch(`http://localhost:8000/api/contacts/${selected.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify({ message: replyText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Reply failed")
      const updated = data.data
      setContacts(prev => prev.map(c => c.id === selected.id ? updated : c))
      setSelected(updated)
      setReplyText("")
      showToast("Reply sent successfully!")
    } catch (err: any) {
      setReplyError(err.message)
    } finally {
      setIsSending(false)
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!showDelete) return
    setIsDeleting(true)
    try {
      const res = await fetch(`http://localhost:8000/api/contacts/${showDelete.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Delete failed")
      setContacts(prev => prev.filter(c => c.id !== showDelete.id))
      if (selected?.id === showDelete.id) setSelected(null)
      setShowDelete(null)
      showToast("Message deleted.")
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error")
      setShowDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  // ── Filtered list ──
  const filtered = contacts.filter(c => {
    const matchesFilter = filter === "all" || c.status === filter
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = contacts.filter(c => c.status === "unread").length

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00] flex items-center gap-3">
              Messages
              {unreadCount > 0 && (
                <span className="px-2.5 py-1 bg-[#8B0000] text-white rounded-full text-sm font-black">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-gray-500 font-medium mt-1">View and reply to contact form submissions.</p>
          </div>
          <button
            onClick={() => fetchContacts(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Main panel */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex h-[calc(100vh-220px)] min-h-[500px]">

          {/* ── Left: Message list ── */}
          <div className="w-full sm:w-80 lg:w-96 flex flex-col border-r border-gray-100 shrink-0">
            {/* Search + filter */}
            <div className="p-4 border-b border-gray-50 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:border-[#8B0000] text-sm transition"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-1.5">
                {(["all", "unread", "read", "replied"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                      filter === f ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="py-16 text-center">
                  <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-bold text-gray-400">Loading messages...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center px-6">
                  <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-400">No messages found</p>
                  <p className="text-xs text-gray-300 mt-1">{search ? "Try a different search term" : "Your inbox is empty"}</p>
                </div>
              ) : (
                filtered.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => openMessage(contact)}
                    className={`w-full text-left p-4 border-b border-gray-50 transition-all hover:bg-gray-50 ${
                      selected?.id === contact.id ? "bg-[#8B0000]/5 border-l-4 border-l-[#8B0000]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          contact.status === "unread" ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm truncate ${contact.status === "unread" ? "font-black text-[#1A0A00]" : "font-bold text-gray-600"}`}>
                            {contact.name}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{contact.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                          {relativeTime(contact.created_at)}
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${STATUS_STYLE[contact.status]}`}>
                          {STATUS_ICON[contact.status]}
                          {contact.status}
                        </span>
                      </div>
                    </div>
                    <p className={`text-xs ml-10 truncate ${contact.status === "unread" ? "text-[#1A0A00] font-bold" : "text-gray-500"}`}>
                      {contact.subject}
                    </p>
                    <p className="text-[11px] text-gray-400 ml-10 mt-0.5 line-clamp-1">{contact.message}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ── Right: Message detail ── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center mb-5">
                  <Mail className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-400 mb-2">Select a message</h3>
                <p className="text-sm text-gray-300 max-w-xs">Click on a message from the list to view its contents and reply.</p>
              </div>
            ) : (
              <>
                {/* Message header */}
                <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-serif font-bold text-[#1A0A00] mb-1 line-clamp-1">{selected.subject}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <strong className="text-[#1A0A00]">{selected.name}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <AtSign className="w-3.5 h-3.5" />
                        <a href={`mailto:${selected.email}`} className="text-[#8B0000] hover:underline font-medium">
                          {selected.email}
                        </a>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(selected.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${STATUS_STYLE[selected.status]}`}>
                      {STATUS_ICON[selected.status]}
                      {selected.status}
                    </span>
                    <button
                      onClick={() => setShowDelete(selected)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Original message */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center text-white text-xs font-black">
                        {selected.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1A0A00]">{selected.name}</p>
                        <p className="text-[10px] text-gray-400">{new Date(selected.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>

                  {/* Previous reply (if exists) */}
                  {selected.status === "replied" && selected.reply_message && (
                    <div className="border-l-4 border-[#8B0000] pl-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-[#1A0A00] rounded-full flex items-center justify-center">
                          <Reply className="w-3.5 h-3.5 text-[#E8B84B]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1A0A00]">Your Reply</p>
                          {selected.replied_at && (
                            <p className="text-[10px] text-gray-400">{new Date(selected.replied_at).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{selected.reply_message}</p>
                    </div>
                  )}
                </div>

                {/* Reply box */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <form onSubmit={handleReply} className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Reply className="w-4 h-4 text-[#8B0000]" />
                      <p className="text-sm font-bold text-[#1A0A00]">
                        Reply to <span className="text-[#8B0000]">{selected.email}</span>
                      </p>
                    </div>
                    {replyError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {replyError}
                      </div>
                    )}
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your reply here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition resize-none"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {selected.status === "replied" ? "⚠️ You've already replied. Sending again will overwrite the previous reply." : ""}
                      </p>
                      <button
                        type="submit"
                        disabled={isSending || !replyText.trim()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#8B0000] text-white rounded-xl font-bold text-sm hover:bg-[#700000] transition disabled:opacity-50"
                      >
                        {isSending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Reply className="w-4 h-4" /> Send Reply</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
        <ConfirmDialog
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
