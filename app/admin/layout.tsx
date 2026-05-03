"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  Package,
  Newspaper,
  Image as ImageIcon,
  Mail,
  Send,
  Users,
  Settings,
  ClipboardList,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  ShoppingCart,
  CheckCheck,
  X,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

const navItems = [
  { name: "Dashboard",    href: "/admin/dashboard",  icon: LayoutDashboard },
  { name: "Intakes",      href: "/admin/intakes",    icon: Calendar },
  { name: "Shop Products",href: "/admin/products",   icon: ShoppingBag },
  { name: "Orders",       href: "/admin/orders",     icon: Package },
  { name: "News & Events",href: "/admin/news",       icon: Newspaper },
  { name: "Gallery",      href: "/admin/gallery",    icon: ImageIcon },
  { name: "Messages",     href: "/admin/messages",   icon: Mail, badge: 3 },
  { name: "Newsletter",   href: "/admin/newsletter", icon: Send },
]

const superAdminItems = [
  { name: "Manage Admins", href: "/admin/users",    icon: Users },
  { name: "Settings",      href: "/admin/settings", icon: Settings },
  { name: "Activity Logs", href: "/admin/logs",     icon: ClipboardList },
]

// ── Sample notifications ──────────────────────────────────────────────────────
const SAMPLE_NOTIFICATIONS = [
  { id: 1, icon: Mail,          color: "bg-blue-100 text-blue-600",   title: "New message received",          desc: "Maria Kemigisa sent a new inquiry",        time: "2 min ago",   unread: true },
  { id: 2, icon: ShoppingCart,  color: "bg-amber-100 text-amber-600", title: "New order placed",               desc: "Order #ORD-7231 — UGX 75,000",            time: "15 min ago",  unread: true },
  { id: 3, icon: Mail,          color: "bg-blue-100 text-blue-600",   title: "New message received",          desc: "David Ssemwanga: Product Support",        time: "1 hour ago",  unread: true },
  { id: 4, icon: Calendar,      color: "bg-green-100 text-green-600", title: "Intake application submitted",   desc: "January 2026 intake — new applicant",   time: "3 hours ago", unread: false },
  { id: 5, icon: ShoppingCart,  color: "bg-amber-100 text-amber-600", title: "Order delivered",               desc: "Order #ORD-7229 marked as delivered",    time: "5 hours ago", unread: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading, logout, role } = useAuth()
  const router   = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // ── Notifications ──
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)
  const bellRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter(n => n.unread).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  const dismissNotification = (id: number) =>
    setNotifications(prev => prev.filter(n => n.id !== id))

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login")
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#8B0000] border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const activeItem =
    [...navItems, ...superAdminItems].find(item => pathname === item.href)?.name || "Admin Panel"

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("") || "A"

  // ── Nav link ────────────────────────────────────────────────────────────────
  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = pathname === item.href
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
          isActive
            ? "bg-white text-[#8B0000] shadow-sm font-bold"
            : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
        }`}
      >
        {/* Active left indicator */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#E8B84B] rounded-r-full" />
        )}
        <item.icon
          className={`w-5 h-5 shrink-0 ${
            isActive ? "text-[#8B0000]" : "text-white/50 group-hover:text-white"
          }`}
        />
        {isSidebarOpen && (
          <span className="text-sm flex-1 truncate">{item.name}</span>
        )}
        {isSidebarOpen && (item as any).badge && (
          <span className="bg-[#E8B84B] text-[#8B0000] text-[10px] font-black px-2 py-0.5 rounded-full">
            {(item as any).badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-[260px]" : "w-0 lg:w-[72px]"
        } overflow-hidden`}
        style={{
          background: "linear-gradient(160deg, #8B0000 0%, #6B0000 60%, #4A0000 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* ── Header / Logo ── */}
        <div className={`relative flex items-center border-b border-white/10 shrink-0 h-20 px-4 ${!isSidebarOpen ? "justify-center" : ""}`}>
          <div
            className="relative shrink-0 bg-white rounded-xl flex items-center justify-center"
            style={{ width: isSidebarOpen ? "148px" : "44px", height: "44px", padding: "6px" }}
          >
            <Image
              src="/Website-Logo.png"
              alt="IUEA Logo"
              fill
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="relative flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-hide">
          {/* Management section */}
          <div className="space-y-0.5">
            {isSidebarOpen && (
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.22em] px-3 mb-3">
                Management
              </p>
            )}
            {navItems.map(item => <NavLink key={item.name} item={item} />)}
          </div>

          {/* System section (super admin) */}
          {role === "super_admin" && (
            <div className="space-y-0.5">
              {isSidebarOpen && (
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.22em] px-3 mb-3">
                  System
                </p>
              )}
              {superAdminItems.map(item => <NavLink key={item.name} item={item} />)}
            </div>
          )}
        </nav>

        {/* ── Logout ── */}
        <div className="relative p-4 border-t border-white/10 shrink-0">
          <button
            onClick={() => logout()}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ───────────────────────────────────────────────────────── */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0 lg:ml-[72px]"
        }`}
      >
        {/* ── Top Header ── */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={() => setIsSidebarOpen(v => !v)}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <span className="hover:text-[#8B0000] cursor-pointer transition-colors">IUEA Portal</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#8B0000] font-bold">{activeItem}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Bell + Notifications Dropdown */}
            <div ref={bellRef} className="relative">
              <button
                onClick={() => setShowNotifications(v => !v)}
                className={`relative p-2 transition-colors rounded-xl ${
                  showNotifications
                    ? "bg-red-50 text-[#8B0000]"
                    : "text-gray-400 hover:text-[#8B0000] hover:bg-red-50"
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8B0000] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown panel */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <p className="text-[10px] text-gray-400 font-medium">{unreadCount} unread</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="flex items-center gap-1 text-[10px] font-black text-[#8B0000] hover:underline uppercase tracking-wider"
                        >
                          <CheckCheck className="w-3 h-3" /> Mark all read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* List */}
                  <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center">
                        <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 font-medium">No notifications</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`flex items-start gap-3 px-5 py-4 transition-colors ${
                            notif.unread ? "bg-red-50/30" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${notif.color}`}>
                            <notif.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm leading-tight ${notif.unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                                {notif.title}
                              </p>
                              {notif.unread && (
                                <span className="w-2 h-2 bg-[#8B0000] rounded-full shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{notif.desc}</p>
                            <p className="text-[10px] text-gray-300 font-medium mt-1">{notif.time}</p>
                          </div>
                          <button
                            onClick={() => dismissNotification(notif.id)}
                            className="p-1 text-gray-300 hover:text-gray-500 rounded-lg transition shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
                    <button
                      onClick={() => { setShowNotifications(false) }}
                      className="text-xs font-black text-[#8B0000] hover:underline uppercase tracking-wider w-full text-center"
                    >
                      View Activity Logs →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-7 w-px bg-gray-100" />

            {/* User chip */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-gray-700 hidden sm:block">{user?.name}</p>
              <div className="w-9 h-9 rounded-full bg-[#8B0000] flex items-center justify-center text-white font-black text-xs uppercase shadow-md">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
