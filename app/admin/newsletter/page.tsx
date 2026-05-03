"use client"

import { useState, useEffect } from "react"
import {
  Send, Users, UserCheck, UserX, Search, RefreshCw,
  X, CheckCircle2, AlertTriangle, Download, Loader2,
  Mail, Calendar, TrendingUp
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Subscriber = {
  id: number
  name?: string
  email: string
  status: "active" | "unsubscribed"
  subscribed_at: string
  unsubscribed_at?: string
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

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: number | string; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-serif font-black text-[#1A0A00]">{value}</p>
        {sub && <p className="text-xs text-gray-400 font-medium mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "unsubscribed">("all")

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  const fetchSubscribers = async (quiet = false) => {
    if (!quiet) setIsLoading(true)
    else setIsRefreshing(true)
    try {
      const res = await fetch("http://localhost:8000/api/newsletter/subscribers", {
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (data?.success) setSubscribers(data.data)
    } catch (e) {
      console.error("Failed to fetch subscribers", e)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => { fetchSubscribers() }, [])

  // ── Unsubscribe a user from admin side ──
  const handleUnsubscribe = async (subscriber: Subscriber) => {
    if (!confirm(`Unsubscribe ${subscriber.email}?`)) return
    try {
      const res = await fetch("http://localhost:8000/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify({ email: subscriber.email }),
      })
      const data = await res.json()
      if (data?.success) {
        setSubscribers(prev =>
          prev.map(s =>
            s.id === subscriber.id
              ? { ...s, status: "unsubscribed", unsubscribed_at: new Date().toISOString() }
              : s
          )
        )
        showToast(`${subscriber.email} has been unsubscribed.`)
      }
    } catch {
      showToast("Failed to unsubscribe", "error")
    }
  }

  // ── Export CSV ──
  const handleExportCSV = () => {
    const activeSubscribers = subscribers.filter(s => s.status === "active")
    if (activeSubscribers.length === 0) {
      showToast("No active subscribers to export.", "error")
      return
    }
    const header = ["Name", "Email", "Subscribed At"]
    const rows = activeSubscribers.map(s => [
      s.name || "",
      s.email,
      new Date(s.subscribed_at).toLocaleDateString(),
    ])
    const csv = [header, ...rows].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `iuea-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast("Subscriber list exported!")
  }

  // ── Stats ──
  const total = subscribers.length
  const active = subscribers.filter(s => s.status === "active").length
  const unsubscribed = subscribers.filter(s => s.status === "unsubscribed").length
  const thisMonth = subscribers.filter(s => {
    const d = new Date(s.subscribed_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  // ── Filtered list ──
  const filtered = subscribers.filter(s => {
    const matchesFilter = filter === "all" || s.status === filter
    const matchesSearch =
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name || "").toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const retentionRate = total > 0 ? Math.round((active / total) * 100) : 0

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Newsletter</h1>
            <p className="text-gray-500 font-medium mt-1">Manage your newsletter subscriber list.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchSubscribers(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A0A00] text-[#E8B84B] rounded-xl font-bold text-sm hover:bg-[#2D1B00] transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-7 h-7 text-[#8B0000]" />}
            label="Total Subscribers"
            value={total}
            color="bg-red-50"
          />
          <StatCard
            icon={<UserCheck className="w-7 h-7 text-green-600" />}
            label="Active"
            value={active}
            sub={`${retentionRate}% retention`}
            color="bg-green-50"
          />
          <StatCard
            icon={<UserX className="w-7 h-7 text-gray-400" />}
            label="Unsubscribed"
            value={unsubscribed}
            color="bg-gray-50"
          />
          <StatCard
            icon={<TrendingUp className="w-7 h-7 text-blue-600" />}
            label="New This Month"
            value={thisMonth}
            color="bg-blue-50"
          />
        </div>

        {/* Retention bar */}
        {total > 0 && (
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-[#1A0A00]">Subscriber Retention</p>
              <p className="text-sm font-black text-[#8B0000]">{retentionRate}%</p>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8B0000] to-[#E8B84B] rounded-full transition-all duration-700"
                style={{ width: `${retentionRate}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-400">{active} active</p>
              <p className="text-xs text-gray-400">{unsubscribed} unsubscribed</p>
            </div>
          </div>
        )}

        {/* Subscriber table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          {/* Search + filter */}
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {(["all", "active", "unsubscribed"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                    filter === f ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
              <span className="text-xs font-bold text-gray-400 ml-2">{filtered.length} shown</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Subscriber</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Subscribed</th>
                  <th className="px-8 py-4">Unsubscribed</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-bold text-gray-400">Loading subscribers...</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                          <Mail className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-gray-400 font-medium">
                          {search ? `No subscribers matching "${search}"` : "No subscribers yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50/30 transition-colors">
                      {/* Email + Name */}
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-black text-gray-500 shrink-0">
                            {(sub.name || sub.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            {sub.name && <p className="font-bold text-sm text-[#1A0A00]">{sub.name}</p>}
                            <p className="text-sm text-gray-500 font-medium">{sub.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-8 py-4">
                        <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          sub.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {sub.status === "active"
                            ? <><UserCheck className="w-3 h-3" /> Active</>
                            : <><UserX className="w-3 h-3" /> Unsubscribed</>
                          }
                        </span>
                      </td>

                      {/* Subscribed date */}
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(sub.subscribed_at).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Unsubscribed date */}
                      <td className="px-8 py-4 text-sm text-gray-400 font-medium">
                        {sub.unsubscribed_at ? new Date(sub.unsubscribed_at).toLocaleDateString() : "—"}
                      </td>

                      {/* Action */}
                      <td className="px-8 py-4 text-right">
                        {sub.status === "active" ? (
                          <button
                            onClick={() => handleUnsubscribe(sub)}
                            className="px-4 py-2 text-xs font-bold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <span className="text-xs text-gray-300 font-bold">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer summary */}
          {!isLoading && filtered.length > 0 && (
            <div className="px-8 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <p className="text-xs text-gray-400 font-medium">
                Showing <strong>{filtered.length}</strong> of <strong>{subscribers.length}</strong> subscribers
              </p>
              <p className="text-xs text-gray-400 font-medium">
                <strong className="text-green-600">{active}</strong> active · <strong className="text-gray-500">{unsubscribed}</strong> unsubscribed
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
