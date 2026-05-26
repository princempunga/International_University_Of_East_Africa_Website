"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Home, 
  Info, 
  GraduationCap, 
  UserPlus, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  Newspaper, 
  Phone, 
  Search,
  ChevronRight,
  Settings
} from "lucide-react"
import Link from "next/link"

const cmsModules = [
  { id: 'home',         name: 'Home Page CMS',   icon: Home,       desc: 'Hero, Stats, Welcome, Programs',       color: 'bg-blue-500',   href: '/admin/cms/home' },
  { id: 'about',        name: 'About CMS',        icon: Info,       desc: 'History, Mission, Vision, Values',     color: 'bg-indigo-500', href: '/admin/cms/about' },
  { id: 'academics',    name: 'Academics CMS',    icon: GraduationCap, desc: 'Faculties, Departments',           color: 'bg-emerald-500',href: '/admin/cms/academics' },
  { id: 'admissions',   name: 'Admissions CMS',   icon: UserPlus,   desc: 'Requirements, Fees, Process',         color: 'bg-amber-500',  href: '/admin/cms/admissions' },
  { id: 'programs',     name: 'Programs CMS',     icon: BookOpen,   desc: 'Program details, duration, tuition',  color: 'bg-purple-500', href: '/admin/cms/programs' },
  { id: 'student-life', name: 'Student Life CMS', icon: Users,      desc: 'Clubs, Sports, Accommodation',        color: 'bg-pink-500',   href: '/admin/cms/student-life' },
  { id: 'gallery',      name: 'Gallery CMS',      icon: ImageIcon,  desc: 'Manage albums and images',            color: 'bg-cyan-500',   href: '/admin/gallery' },
  { id: 'news',         name: 'News CMS',         icon: Newspaper,  desc: 'Blog posts and categories',           color: 'bg-orange-500', href: '/admin/news' },
  { id: 'contact',      name: 'Contact CMS',      icon: Phone,      desc: 'Info, Social Media, Google Maps',     color: 'bg-slate-500',  href: '/admin/cms/contact' },
  { id: 'seo',          name: 'SEO Settings',     icon: Search,     desc: 'Meta titles, descriptions, keywords, OG tags', color: 'bg-rose-500', href: '/admin/cms/seo' },
]

export default function CMSLandingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Website CMS</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage all public website content dynamically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmsModules.map((module, idx) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link 
              href={module.href || `/admin/cms/${module.id}`}
              className="group block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#8B0000]/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center text-white shadow-lg shadow-${module.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-7 h-7" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-[#8B0000] group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#8B0000] transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">
                  {module.desc}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-xs font-black text-[#8B0000] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Manage Content →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
