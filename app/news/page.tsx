"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Tag, ArrowRight, Search, Loader2, Newspaper } from "lucide-react"
import api from "@/lib/api"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Academic", "Technology", "Events", "Student Life", "Research", "Achievement", "Campus"]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.getPublicNews({ status: 'published' })
        if (res?.success) {
          setNewsItems(res.data)
        }
      } catch (err) {
        console.error("Failed to fetch news:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [])

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                         item.excerpt?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "All" || item.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/pic10.jpg" 
            alt="News & Events Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/40 via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            News & Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Stay informed about the latest happenings at IUEA, from academic achievements to campus life.
          </motion.p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-[#8B0000] border-[#8B0000] text-white" 
                  : "border-gray-200 text-gray-600 hover:border-[#8B0000] hover:text-[#8B0000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-[#F5F0E8] outline-none focus:ring-1 focus:ring-[#8B0000]" 
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#8B0000] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading the latest updates...</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredNews.map((news, idx) => (
                  <motion.article 
                    key={news.id || news.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group flex flex-col h-full"
                  >
                    <Link href={`/news/${news.slug}`} className="relative h-64 rounded-3xl overflow-hidden mb-6 block bg-gray-100">
                      {news.image_url ? (
                        <Image src={news.image_url} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-4 py-1 bg-[#E8B84B] text-[#1A0A00] text-[10px] font-black rounded-full uppercase tracking-wider">
                        {news.category}
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-[#6B5B4F] mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(news.published_at || news.created_at)}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h3>
                    <p className="text-[#6B5B4F] mb-6 flex-1 line-clamp-3 text-sm leading-relaxed">
                      {news.excerpt}
                    </p>
                    <Link href={`/news/${news.slug}`} className="inline-flex items-center gap-2 font-bold text-[#8B0000] group-hover:gap-3 transition-all text-sm uppercase tracking-wider">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-2">No Articles Found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-20 flex justify-center gap-4">
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">1</button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">2</button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">3</button>
          </div>
        </div>
      </section>


    </main>
  )
}
