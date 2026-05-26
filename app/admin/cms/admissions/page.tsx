"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Save,
  Trash2, 
  FileText,
  DollarSign,
  Info,
  Loader2,
  CheckCircle2
} from "lucide-react"
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function AdmissionsCMS() {
  const [contents, setContents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<any>(null)

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admissions/content')
      const data = await res.json()
      setContents(data)
    } catch (error) {
      console.error("Error fetching admissions content:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: number, index: number) => {
    setSaving(true)
    const token = localStorage.getItem("iuea_token")
    try {
      const res = await fetch(`http://localhost:8000/api/admissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contents[index])
      })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Section updated!' })
        setTimeout(() => setMessage(null), 3000)
      }
    } catch (error) {
      console.error("Error updating content:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleContentChange = (index: number, value: string) => {
    const newContents = [...contents]
    newContents[index].content = value
    setContents(newContents)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admissions CMS</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage requirements, fees, and application process.</p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3 font-bold text-sm"
          >
            <CheckCircle2 className="w-5 h-5" /> {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {contents.map((item, idx) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8B0000]">
                  {item.category === 'fees' ? <DollarSign className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-0.5">{item.category}</p>
                </div>
              </div>
              <button 
                onClick={() => handleUpdate(item.id, idx)}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#8B0000] text-white font-black rounded-xl hover:bg-[#6B0000] transition-all text-xs"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                SAVE
              </button>
            </div>
            <div className="p-8">
              <ReactQuill 
                theme="snow"
                value={item.content}
                onChange={(val) => handleContentChange(idx, val)}
                className="bg-white rounded-2xl"
              />
            </div>
          </div>
        ))}

        {contents.length === 0 && !loading && (
           <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <Info className="w-12 h-12 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-400 font-bold">No admissions content found.</p>
             <button className="mt-4 text-[#8B0000] font-black uppercase text-xs tracking-widest hover:underline">Add First Section</button>
           </div>
        )}
      </div>
    </div>
  )
}
