"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

export default function CMSPageEditor() {
  const { id: pageSlug } = useParams()
  const router = useRouter()
  const [page, setPage] = useState<any>(null)
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  useEffect(() => {
    fetchPageData()
  }, [pageSlug])

  const fetchPageData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/cms/pages/${pageSlug}`)
      const data = await res.json()
      setPage(data)
      setSections(data.sections || [])
    } catch (error) {
      console.error("Error fetching page data:", error)
      setMessage({ type: 'error', text: 'Failed to load page content.' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSection = async (sectionId: number, index: number) => {
    setSaving(true)
    setMessage(null)
    try {
      const section = sections[index]
      const token = localStorage.getItem("iuea_token")
      
      const res = await fetch(`http://localhost:8000/api/cms/sections/${sectionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          content: section.content,
          is_active: section.is_active,
          order: section.order
        })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: 'success', text: `${section.section_name} updated successfully!` })
      } else {
        throw new Error(data.message || 'Update failed')
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save changes.' })
    } finally {
      setSaving(false)
    }
  }

  const handleContentChange = (index: number, key: string, value: any) => {
    const newSections = [...sections]
    newSections[index].content[key] = value
    setSections(newSections)
  }

  const handleArrayContentChange = (sectionIndex: number, arrayIndex: number, key: string, value: any) => {
    const newSections = [...sections]
    newSections[sectionIndex].content[arrayIndex][key] = value
    setSections(newSections)
  }

  const handleImageUpload = async (sectionIndex: number, key: string, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', `cms/${pageSlug}`)

    try {
      const token = localStorage.getItem("iuea_token")
      const res = await fetch('http://localhost:8000/api/cms/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      const data = await res.json()
      if (data.url) {
        handleContentChange(sectionIndex, key, data.url)
      }
    } catch (error) {
      console.error("Image upload failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading editor...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/cms"
            className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">{page?.title || 'Edit Page'}</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Slug: <span className="text-[#8B0000]">/{pageSlug}</span></p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={`/${pageSlug}`}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <Eye className="w-4 h-4" /> Preview
          </Link>
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-2xl flex items-center gap-3 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm">{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-auto text-xs uppercase font-black opacity-50 hover:opacity-100">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={section.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-black text-xs">
                  {idx + 1}
                </div>
                <div className="text-left">
                  <h3 className="font-black text-gray-900">{section.section_name}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-black mt-0.5">{section.section_key}</p>
                </div>
              </div>
              {expandedSection === idx ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
            </button>

            {expandedSection === idx && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 border-t border-gray-50 space-y-6"
              >
                {/* Dynamic Fields based on content structure */}
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(section.content).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{key.replace(/_/g, ' ')}</label>
                      
                      {typeof value === 'string' && (key.includes('description') || key.includes('content') || key.includes('mission') || key.includes('vision')) ? (
                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                          <ReactQuill 
                            theme="snow" 
                            value={value} 
                            onChange={(content) => handleContentChange(idx, key, content)}
                            modules={quillModules}
                          />
                        </div>
                      ) : typeof value === 'string' && (key.includes('image') || key.includes('banner')) ? (
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 group">
                            <img src={value} alt={key} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="cursor-pointer bg-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-900 hover:scale-105 transition-transform">
                                Replace Image
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, key, e.target.files[0])}
                                />
                              </label>
                            </div>
                          </div>
                          <input 
                            type="text" 
                            value={value}
                            onChange={(e) => handleContentChange(idx, key, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-600"
                          />
                        </div>
                      ) : Array.isArray(value) ? (
                        <div className="space-y-4">
                          {value.map((item, itemIdx) => (
                            <div key={itemIdx} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                              {Object.entries(item).map(([subKey, subValue]) => (
                                <div key={subKey} className="space-y-1">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{subKey}</label>
                                  <input 
                                    type="text"
                                    value={subValue as string}
                                    onChange={(e) => handleArrayContentChange(idx, itemIdx, subKey, e.target.value)}
                                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-gray-900 shadow-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input 
                          type="text" 
                          value={value as string}
                          onChange={(e) => handleContentChange(idx, key, e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={section.is_active}
                          onChange={(e) => {
                            const newSections = [...sections]
                            newSections[idx].is_active = e.target.checked
                            setSections(newSections)
                          }}
                          className="w-5 h-5 rounded-lg border-gray-300 text-[#8B0000] focus:ring-[#8B0000]" 
                        />
                        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Active</span>
                      </label>
                   </div>
                   
                   <button
                     onClick={() => handleUpdateSection(section.id, idx)}
                     disabled={saving}
                     className="flex items-center gap-2 px-8 py-3 bg-[#8B0000] text-white font-black rounded-2xl hover:bg-[#6B0000] disabled:opacity-50 transition-all shadow-lg shadow-red-100"
                   >
                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     SAVE CHANGES
                   </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
