"use client"

import { useState, useEffect } from "react"
import { 
  Search, Save, CheckCircle2, AlertTriangle, X, Loader2, 
  Globe, Share2, Type, AlignLeft, Hash, Edit3 
} from "lucide-react"
import { api } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </motion.div>
  )
}

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition bg-white"
const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2"

export default function SeoManagementPage() {
  const [settings, setSettings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedPage, setSelectedPage] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })

  const fetchSettings = async () => {
    setIsLoading(true)
    try {
      const res = await api.getAllSeo()
      if (res?.success) {
        setSettings(res.data)
        if (res.data.length > 0 && !selectedPage) {
          setSelectedPage(res.data[0])
        }
      }
    } catch (error) {
      showToast("Failed to load SEO settings", "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPage) return

    setIsSaving(true)
    try {
      const res = await api.updateSeo(selectedPage)
      if (res?.success) {
        showToast("SEO settings updated successfully!")
        setSettings(prev => prev.map(s => s.page_name === selectedPage.page_name ? res.data : s))
      } else {
        throw new Error(res?.message || "Update failed")
      }
    } catch (error: any) {
      showToast(error.message || "Failed to update SEO settings", "error")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#8B0000]/10 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-[#8B0000]" />
            </div>
            <h1 className="text-3xl font-serif font-black text-[#1A0A00]">SEO Management</h1>
          </div>
          <p className="text-gray-500 font-medium max-w-xl">
            Optimize your university website for search engines. Manage meta titles, descriptions and social sharing cards.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl">
          <Globe className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Live Preview Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Page List Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Select Page</h2>
            <div className="space-y-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-14 bg-gray-50 rounded-2xl animate-pulse" />
                ))
              ) : (
                settings.map((item) => (
                  <button
                    key={item.page_name}
                    onClick={() => setSelectedPage(item)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                      selectedPage?.page_name === item.page_name
                        ? "bg-[#1A0A00] border-[#1A0A00] text-white shadow-lg shadow-black/10"
                        : "bg-white border-gray-100 text-gray-600 hover:border-[#8B0000]/30 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedPage?.page_name === item.page_name ? "bg-white/10" : "bg-gray-100"
                      }`}>
                        <Globe className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold capitalize">{item.page_name}</span>
                    </div>
                    {selectedPage?.page_name === item.page_name && (
                      <motion.div layoutId="active-indicator">
                        <CheckCircle2 className="w-4 h-4 text-[#E8B84B]" />
                      </motion.div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-[#8B0000] rounded-[28px] p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#E8B84B] mb-2">SEO Tip</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90">
                Keep your Meta Titles under 60 characters and Descriptions under 160 characters for best visibility on Google.
              </p>
            </div>
            <Search className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedPage ? (
              <motion.div
                key={selectedPage.page_name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Editor Header */}
                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-5 h-5 text-[#8B0000]" />
                    <h2 className="text-lg font-serif font-bold text-[#1A0A00]">
                      Editing: <span className="capitalize">{selectedPage.page_name}</span>
                    </h2>
                  </div>
                  <button
                    onClick={handleUpdate}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#8B0000] text-white rounded-xl font-bold text-sm hover:bg-[#700000] transition disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="p-8 space-y-8">
                  {/* Standard SEO */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="w-4 h-4 text-gray-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Search Engine Basics</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>Meta Title</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={selectedPage.title}
                          onChange={(e) => setSelectedPage({...selectedPage, title: e.target.value})}
                          placeholder="Page title for Google"
                        />
                        <div className="flex justify-end mt-1">
                          <span className={`text-[10px] font-bold ${selectedPage.title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                            {selectedPage.title.length}/60
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Meta Description</label>
                        <textarea
                          rows={3}
                          className={`${inputClass} resize-none`}
                          value={selectedPage.description}
                          onChange={(e) => setSelectedPage({...selectedPage, description: e.target.value})}
                          placeholder="Summary for search results"
                        />
                        <div className="flex justify-end mt-1">
                          <span className={`text-[10px] font-bold ${selectedPage.description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                            {selectedPage.description.length}/160
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Meta Keywords (Optional)</label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            className={`${inputClass} pl-10`}
                            value={selectedPage.keywords || ""}
                            onChange={(e) => setSelectedPage({...selectedPage, keywords: e.target.value})}
                            placeholder="keyword1, keyword2, keyword3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Social SEO */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Share2 className="w-4 h-4 text-gray-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Social Sharing (OpenGraph)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>OG Title</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={selectedPage.og_title || ""}
                            onChange={(e) => setSelectedPage({...selectedPage, og_title: e.target.value})}
                            placeholder="Title for Facebook/Twitter"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>OG Description</label>
                          <textarea
                            rows={3}
                            className={`${inputClass} resize-none`}
                            value={selectedPage.og_description || ""}
                            onChange={(e) => setSelectedPage({...selectedPage, og_description: e.target.value})}
                            placeholder="Description for social cards"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>OG Image URL</label>
                        <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[24px] p-4 flex flex-col items-center justify-center text-center h-[calc(100%-24px)] min-h-[160px]">
                          {selectedPage.og_image ? (
                            <div className="relative w-full h-full min-h-[120px] rounded-xl overflow-hidden">
                              <img src={selectedPage.og_image} alt="OG Preview" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setSelectedPage({...selectedPage, og_image: ""})}
                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-lg backdrop-blur-md"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                              <p className="text-xs font-medium text-gray-400">Preview Image URL</p>
                              <input 
                                type="url" 
                                className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-200 text-[10px] focus:outline-none" 
                                placeholder="https://example.com/image.jpg"
                                value={selectedPage.og_image || ""}
                                onChange={(e) => setSelectedPage({...selectedPage, og_image: e.target.value})}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Google Preview */}
                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Google Search Preview</h3>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 max-w-2xl">
                    <p className="text-[#1a0dab] text-xl hover:underline cursor-pointer mb-1 truncate">
                      {selectedPage.title || "Page Title Placeholder"}
                    </p>
                    <p className="text-[#006621] text-sm mb-1 truncate">
                      https://iuea.ac.ug/{selectedPage.page_name === 'home' ? '' : selectedPage.page_name}
                    </p>
                    <p className="text-[#545454] text-sm line-clamp-2">
                      {selectedPage.description || "Please provide a meta description to see how your site will appear in Google search results."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-[32px] border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#1A0A00]">No Page Selected</h3>
                <p className="text-gray-400 max-w-xs mt-2 font-medium">
                  Select a page from the list on the left to start optimizing its SEO settings.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

function ImageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
