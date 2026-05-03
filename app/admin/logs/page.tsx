"use client"

import { useState, useEffect } from "react"
import {
  Activity, Search, RefreshCw, Filter, ChevronLeft,
  ChevronRight, X, CheckCircle2, AlertTriangle,
  ShieldCheck, Package, Calendar, Newspaper, Image,
  Mail, Users, Settings, ShoppingCart, LogIn, LogOut,
  Edit, Trash2, Plus, Eye
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type LogEntry = {
  id: number
  action: string
  model_type?: string
  model_id?: number
  description: string
  ip_address?: string
  created_at: string
  user?: { id: number; name: string; email: string; role: string }
}

// ─── Action color + icon map ──────────────────────────────────────────────────
function getActionStyle(action: string): { color: string; bg: string; icon: React.ReactNode } {
  const a = action.toLowerCase()
  if (a.includes("create") || a.includes("add") || a.includes("upload") || a.includes("subscribe"))
    return { color: "text-green-700", bg: "bg-green-100", icon: <Plus className="w-3.5 h-3.5" /> }
  if (a.includes("update") || a.includes("edit") || a.includes("change") || a.includes("activate") || a.includes("publish"))
    return { color: "text-blue-700", bg: "bg-blue-100", icon: <Edit className="w-3.5 h-3.5" /> }
  if (a.includes("delete") || a.includes("remove") || a.includes("unsubscribe"))
    return { color: "text-red-700", bg: "bg-red-100", icon: <Trash2 className="w-3.5 h-3.5" /> }
  if (a.includes("login") || a.includes("logout"))
    return { color: "text-purple-700", bg: "bg-purple-100", icon: a.includes("logout") ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" /> }
  if (a.includes("view") || a.includes("read"))
    return { color: "text-gray-600", bg: "bg-gray-100", icon: <Eye className="w-3.5 h-3.5" /> }
  return { color: "text-amber-700", bg: "bg-amber-100", icon: <Activity className="w-3.5 h-3.5" /> }
}

function getModelIcon(modelType?: string): React.ReactNode {
  if (!modelType) return <Activity className="w-4 h-4" />
  const m = modelType.toLowerCase()
  if (m.includes("product")) return <Package className="w-4 h-4" />
  if (m.includes("intake")) return <Calendar className="w-4 h-4" />
  if (m.includes("news")) return <Newspaper className="w-4 h-4" />
  if (m.includes("gallery")) return <Image className="w-4 h-4" />
  if (m.includes("contact")) return <Mail className="w-4 h-4" />
  if (m.includes("user")) return <Users className="w-4 h-4" />
  if (m.includes("order")) return <ShoppingCart className="w-4 h-4" />
  if (m.includes("setting")) return <Settings className="w-4 h-4" />
  return <Activity className="w-4 h-4" />
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const perPage = 20

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  const fetchLogs = async (quiet = false) => {
    if (!quiet) setIsLoading(true)
    else setIsRefreshing(true)
    try {
      const res = await fetch("http://localhost:8000/api/logs", {
        headers: {
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })
      const data = await res.json()
      if (data?.success) {
        setLogs(data.data)
        setTotal(data.meta?.total || data.data.length)
      }
    } catch (e) {
      console.error("Failed to fetch logs", e)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => { fetchLogs() }, [])

  // ── Filter + paginate client-side ──
  const ACTION_TYPES = ["all", "create", "update", "delete", "login", "view"]

  const filtered = logs.filter(log => {
    const matchesSearch =
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      (log.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.model_type || "").toLowerCase().includes(search.toLowerCase())
    const matchesAction =
      actionFilter === "all" || log.action.toLowerCase().includes(actionFilter)
    return matchesSearch && matchesAction
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1) }, [search, actionFilter])

  // ── Stats ──
  const actionCounts = {
    creates: logs.filter(l => l.action.toLowerCase().includes("create") || l.action.toLowerCase().includes("add")).length,
    updates: logs.filter(l => l.action.toLowerCase().includes("update") || l.action.toLowerCase().includes("edit")).length,
    deletes: logs.filter(l => l.action.toLowerCase().includes("delete")).length,
    logins: logs.filter(l => l.action.toLowerCase().includes("login")).length,
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Activity Logs</h1>
            <p className="text-gray-500 font-medium mt-1">
              Full audit trail of all admin actions. <span className="font-bold text-[#1A0A00]">{logs.length}</span> total events recorded.
            </p>
          </div>
          <button
            onClick={() => fetchLogs(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stat chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Created", count: actionCounts.creates, color: "bg-green-50 text-green-700", dot: "bg-green-500" },
            { label: "Updated", count: actionCounts.updates, color: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
            { label: "Deleted", count: actionCounts.deletes, color: "bg-red-50 text-red-600", dot: "bg-red-500" },
            { label: "Logins", count: actionCounts.logins, color: "bg-purple-50 text-purple-700", dot: "bg-purple-500" },
          ].map(({ label, count, color, dot }) => (
            <div key={label} className={`rounded-2xl px-5 py-4 flex items-center gap-3 ${color}`}>
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
              <div>
                <p className="text-2xl font-serif font-black">{count}</p>
                <p className="text-xs font-black uppercase tracking-wider opacity-70">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user, action or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {ACTION_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setActionFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                    actionFilter === type
                      ? "bg-[#8B0000] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Log list */}
          <div className="divide-y divide-gray-50">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-bold text-gray-400">Loading activity logs...</p>
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-gray-400 font-medium">
                  {search || actionFilter !== "all" ? "No logs match your filters." : "No activity recorded yet."}
                </p>
              </div>
            ) : (
              paginated.map(log => {
                const style = getActionStyle(log.action)
                return (
                  <div key={log.id} className="px-8 py-5 hover:bg-gray-50/40 transition-colors flex items-start gap-5">
                    {/* Action badge */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${style.bg} ${style.color}`}>
                      {style.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {/* Action tag */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${style.bg} ${style.color}`}>
                          {log.action}
                        </span>
                        {/* Model type */}
                        {log.model_type && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">
                            {getModelIcon(log.model_type)}
                            {log.model_type.replace(/^.*\\/, "").replace(/([A-Z])/g, " $1").trim()}
                            {log.model_id && ` #${log.model_id}`}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#1A0A00] font-medium leading-snug">{log.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {log.user && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-[#1A0A00] flex items-center justify-center text-[#E8B84B] text-[9px] font-black">
                              {log.user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs font-bold text-gray-600">{log.user.name}</span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              ({log.user.role.replace("_", " ")})
                            </span>
                          </div>
                        )}
                        {log.ip_address && (
                          <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded-lg">
                            {log.ip_address}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Time */}
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-gray-400 whitespace-nowrap">{relativeTime(log.created_at)}</p>
                      <p className="text-[10px] text-gray-300 mt-0.5 whitespace-nowrap">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Pagination footer */}
          {!isLoading && filtered.length > 0 && (
            <div className="px-8 py-5 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
              <p className="text-xs text-gray-400 font-medium">
                Showing <strong>{Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong> events
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                          page === pageNum ? "bg-[#8B0000] text-white" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
