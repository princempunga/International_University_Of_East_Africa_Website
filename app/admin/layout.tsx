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

const navItemsData = [
  { name: "Dashboard",    href: "/admin/dashboard",  icon: LayoutDashboard },
  { name: "Intakes",      href: "/admin/intakes",    icon: Calendar },
  { name: "Shop Products",href: "/admin/products",   icon: ShoppingBag },
  { name: "Orders",       href: "/admin/orders",     icon: Package },
  { name: "News & Events",href: "/admin/news",       icon: Newspaper },
  { name: "Gallery",      href: "/admin/gallery",    icon: ImageIcon },
  { name: "Website CMS",  href: "/admin/cms",        icon: LayoutDashboard },
  { name: "Messages",     href: "/admin/messages",   icon: Mail },
  { name: "Newsletter",   href: "/admin/newsletter", icon: Send },
]

const superAdminItems = [
  { name: "Manage Admins", href: "/admin/users",    icon: Users },
  { name: "Settings",      href: "/admin/settings", icon: Settings },
  { name: "Activity Logs", href: "/admin/logs",     icon: ClipboardList },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading, logout, role } = useAuth()
  const router   = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // ── Real Data for Notifications & Badges ──
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)
  
  const bellRef = useRef<HTMLDivElement>(null)
  const unreadNotifCount = notifications.filter(n => n.unread).length

  const fetchDynamicData = async () => {
    const token = localStorage.getItem("iuea_token")
    if (!token) return

    try {
      // 1. Fetch Contacts
      const contactRes = await fetch("http://localhost:8000/api/contacts", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      })
      const contactData = await contactRes.json()
      
      let newNotifs: any[] = []

      if (contactData.success) {
        const messages = contactData.data
        const unreadMsg = messages.filter((m: any) => m.status === "unread")
        setUnreadMessagesCount(unreadMsg.length)

        const messageNotifs = unreadMsg
          .slice(0, 5)
          .map((m: any) => ({
            id: `msg-${m.id}`,
            icon: Mail,
            color: "bg-blue-100 text-blue-600",
            title: "New Message",
            desc: `${m.name}: ${m.subject}`,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: true,
            link: "/admin/messages",
            timestamp: new Date(m.created_at).getTime()
          }))
        newNotifs = [...newNotifs, ...messageNotifs]
      }

      // 2. Fetch Orders
      const orderRes = await fetch("http://localhost:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      })
      const orderData = await orderRes.json()

      if (orderData.success) {
        const orders = orderData.data
        const pendingOrders = orders.filter((o: any) => o.status === "pending")
        
        const orderNotifs = pendingOrders
          .slice(0, 5)
          .map((o: any) => ({
            id: `ord-${o.id}`,
            icon: ShoppingCart,
            color: "bg-amber-100 text-amber-600",
            title: "New Order",
            desc: `Order #${o.order_number} by ${o.customer_name}`,
            time: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: true,
            link: "/admin/orders",
            timestamp: new Date(o.created_at).getTime()
          }))
        newNotifs = [...newNotifs, ...orderNotifs]
      }

      // Sort by latest and set
      setNotifications(newNotifs.sort((a, b) => b.timestamp - a.timestamp))

    } catch (e) {
      console.error("Failed to fetch notification data", e)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchDynamicData()
      const interval = setInterval(fetchDynamicData, 30000) 
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

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

  const dismissNotification = (id: string) =>
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
    [...navItemsData, ...superAdminItems].find(item => pathname === item.href)?.name || "Admin Panel"

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("") || "A"

  // ── Nav link ────────────────────────────────────────────────────────────────
  const NavLink = ({ item }: { item: any }) => {
    const isActive = pathname === item.href
    const badgeCount = item.name === "Messages" ? unreadMessagesCount : 0

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
        {isSidebarOpen && badgeCount > 0 && (
          <span className="bg-[#E8B84B] text-[#8B0000] text-[10px] font-black px-2 py-0.5 rounded-full">
            {badgeCount}
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
            {navItemsData.map(item => <NavLink key={item.name} item={item} />)}
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
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8B0000] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {unreadNotifCount}
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
                      {unreadNotifCount > 0 && (
                        <p className="text-[10px] text-gray-400 font-medium">{unreadNotifCount} unread</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadNotifCount > 0 && (
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
