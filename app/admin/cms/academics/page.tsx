"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  GraduationCap, 
  Image as ImageIcon,
  ChevronRight,
  Save,
  X,
  Loader2
} from "lucide-react"

export default function AcademicsCMS() {
  const [faculties, setFaculties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    banner_image: '',
    icon: ''
  })

  useEffect(() => {
    fetchFaculties()
  }, [])

  const fetchFaculties = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/faculties')
      const data = await res.json()
      setFaculties(data)
    } catch (error) {
      console.error("Error fetching faculties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (faculty: any = null) => {
    if (faculty) {
      setEditingFaculty(faculty)
      setFormData({
        name: faculty.name,
        description: faculty.description || '',
        banner_image: faculty.banner_image || '',
        icon: faculty.icon || ''
      })
    } else {
      setEditingFaculty(null)
      setFormData({ name: '', description: '', banner_image: '', icon: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const token = localStorage.getItem("iuea_token")
    const url = editingFaculty 
      ? `http://localhost:8000/api/faculties/${editingFaculty.id}` 
      : 'http://localhost:8000/api/faculties'
    
    try {
      const res = await fetch(url, {
        method: editingFaculty ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setIsModalOpen(false)
        fetchFaculties()
      }
    } catch (error) {
      console.error("Error saving faculty:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Academics CMS</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage university faculties and departments.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white font-black rounded-2xl hover:bg-[#6B0000] transition-all shadow-lg shadow-red-100"
        >
          <Plus className="w-5 h-5" /> ADD FACULTY
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((faculty) => (
            <motion.div 
              key={faculty.id}
              layout
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group"
            >
              <div className="aspect-[16/9] relative bg-gray-100">
                {faculty.banner_image ? (
                  <img src={faculty.banner_image} alt={faculty.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(faculty)}
                    className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-[#8B0000] hover:bg-white transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#8B0000] transition-colors line-clamp-1">
                  {faculty.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-medium line-clamp-2">
                  {faculty.description || 'No description provided.'}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {faculty.programs?.length || 0} Programs
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900">{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Faculty Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Faculty of Science and Technology"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Banner Image URL</label>
                  <input 
                    type="text"
                    value={formData.banner_image}
                    onChange={(e) => setFormData({...formData, banner_image: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Brief description of the faculty..."
                  />
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-8 py-4 bg-[#8B0000] text-white font-black rounded-2xl hover:bg-[#6B0000] transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {editingFaculty ? 'UPDATE FACULTY' : 'CREATE FACULTY'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
