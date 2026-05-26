"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  BookOpen, 
  ChevronRight,
  Save,
  X,
  Loader2,
  Filter,
  DollarSign,
  Clock
} from "lucide-react"

export default function ProgramsCMS() {
  const [programs, setPrograms] = useState<any[]>([])
  const [faculties, setFaculties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    faculty_id: '',
    level: 'Degree',
    duration: '',
    tuition_fee: '',
    description: '',
    requirements: '',
    image: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [progRes, facRes] = await Promise.all([
        fetch('http://localhost:8000/api/programs/search'), // Using the public search endpoint to get all for now
        fetch('http://localhost:8000/api/faculties')
      ])
      const progData = await progRes.json()
      const facData = await facRes.json()
      setPrograms(progData)
      setFaculties(facData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (program: any = null) => {
    if (program) {
      setEditingProgram(program)
      setFormData({
        name: program.name,
        faculty_id: program.faculty_id,
        level: program.level,
        duration: program.duration,
        tuition_fee: program.tuition_fee,
        description: program.description || '',
        requirements: program.requirements || '',
        image: program.image || ''
      })
    } else {
      setEditingProgram(null)
      setFormData({ 
        name: '', 
        faculty_id: faculties[0]?.id || '', 
        level: 'Degree', 
        duration: '', 
        tuition_fee: '', 
        description: '', 
        requirements: '', 
        image: '' 
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const token = localStorage.getItem("iuea_token")
    const url = editingProgram 
      ? `http://localhost:8000/api/programs/${editingProgram.id}` 
      : 'http://localhost:8000/api/programs'
    
    try {
      const res = await fetch(url, {
        method: editingProgram ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setIsModalOpen(false)
        fetchData()
      }
    } catch (error) {
      console.error("Error saving program:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Programs CMS</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage all academic programs across faculties.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white font-black rounded-2xl hover:bg-[#6B0000] transition-all shadow-lg shadow-red-100"
        >
          <Plus className="w-5 h-5" /> ADD PROGRAM
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#8B0000] animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Program Details</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Faculty</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration & Fees</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#8B0000]">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900 leading-tight">{program.name}</p>
                            <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">{program.level}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {program.faculty?.name || 'Unassigned'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                            <Clock className="w-3 h-3" /> {program.duration}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#8B0000] font-black uppercase tracking-widest">
                             UGX {Number(program.tuition_fee).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          program.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${program.is_active ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {program.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(program)}
                            className="p-2 bg-gray-50 text-gray-400 hover:text-[#8B0000] hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

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
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900">{editingProgram ? 'Edit Program' : 'Add New Program'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Program Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Faculty</label>
                    <select 
                      value={formData.faculty_id}
                      onChange={(e) => setFormData({...formData, faculty_id: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none appearance-none"
                    >
                      {faculties.map(fac => <option key={fac.id} value={fac.id}>{fac.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Level</label>
                    <select 
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none appearance-none"
                    >
                      <option>Degree</option>
                      <option>Diploma</option>
                      <option>Certificate</option>
                      <option>Masters</option>
                      <option>PhD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                    <input 
                      type="text" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                      placeholder="e.g. 3 Years"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tuition Fee (UGX)</label>
                    <input 
                      type="number" 
                      value={formData.tuition_fee}
                      onChange={(e) => setFormData({...formData, tuition_fee: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Requirements</label>
                  <textarea 
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none resize-none"
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
                    {editingProgram ? 'UPDATE PROGRAM' : 'CREATE PROGRAM'}
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
