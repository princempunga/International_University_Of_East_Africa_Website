"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ArrowRight, Loader2, Newspaper } from "lucide-react"
import api from "@/lib/api"

export function NewsEvents() {
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await api.getPublicNews({ limit: 4, status: 'published' })
        if (res?.success) {
          setNewsItems(res.data)
        }
      } catch (err) {
        console.error("Failed to fetch home news:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLatestNews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
    alert("Thank you for subscribing!")
  }

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[#E8B84B] text-sm font-semibold tracking-[0.2em] uppercase">
              Stay Updated
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
              News & Events
            </h2>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 w-full sm:w-64 border border-[#E8E0D5] rounded-lg bg-white text-[#1A0A00] placeholder:text-[#6B5B4F] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#6B0000] transition-colors w-full sm:w-auto"
            >
              Join
            </button>
          </form>
        </motion.div>

        {/* News Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#8B0000] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading news...</p>
            </div>
          ) : newsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsItems.map((item, index) => (
                <motion.article
                  key={item.id || item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative h-[200px] overflow-hidden bg-gray-50">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-gray-200" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#8B0000] text-white text-[10px] font-black rounded-full shadow-sm uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#6B5B4F] font-medium">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.published_at || item.created_at)}
                    </div>
                    <h3 className="mt-3 text-lg font-serif font-bold text-[#1A0A00] line-clamp-2 group-hover:text-[#8B0000] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#6B5B4F] line-clamp-2 leading-relaxed flex-1">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/news/${item.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#8B0000] transition-all uppercase tracking-widest"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-gray-800">No recent news</h3>
              <p className="text-gray-500">Check back later for university updates.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
