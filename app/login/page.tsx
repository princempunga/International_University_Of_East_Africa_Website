"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ChevronLeft } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/admin/dashboard")
    } else {
      setError(result.error || "Invalid email or password. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="h-screen w-full flex bg-[#fafafa] overflow-hidden">
      {/* LEFT SIDE - BRANDING (40%) */}
      <section className="hidden lg:flex w-[40%] bg-[#8B0000] relative flex-col items-center justify-center p-16 text-center shadow-[20px_0_60px_rgba(0,0,0,0.1)] z-10">
        {/* Background Gradients & Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#700000] to-[#500000]" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center w-full max-w-sm"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="mb-12 bg-white/10 p-8 rounded-[40px] backdrop-blur-xl border border-white/20 shadow-2xl"
          >
            <Image 
              src="/Website-Logo.png" 
              alt="IUEA Logo" 
              width={220} 
              height={90} 
              className="brightness-0 invert object-contain"
              priority
            />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl xl:text-5xl font-serif font-black text-white mb-6 leading-tight italic"
          >
            "Empowering Africa Through Excellence"
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6 }}
            className="h-1 w-20 bg-[#E8B84B] mb-6 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="text-white text-xl font-medium tracking-[0.1em] uppercase"
          >
            International University <br/> of East Africa
          </motion.p>
        </motion.div>

        <div className="absolute bottom-10 text-white/30 text-xs font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} IUEA | Admin Portal
        </div>
      </section>

      {/* RIGHT SIDE - LOGIN FORM (60%) */}
      <section className="w-full lg:w-[60%] flex flex-col relative">
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-[#8B0000] transition-all font-bold text-sm group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </Link>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[440px]"
          >
            <div className="mb-12">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#E8B84B] text-[10px] font-black tracking-[0.3em] uppercase block mb-4"
              >
                SECURE ADMIN ACCESS
              </motion.span>
              <h1 className="text-5xl font-serif font-black text-[#1A0A00] mb-4 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                Please enter your credentials to access the <br className="hidden sm:block"/> IUEA administration portal.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-8"
                >
                  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-2xl flex items-center gap-4 shadow-sm">
                    <div className="bg-red-500/10 p-2 rounded-full">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    </div>
                    <p className="text-sm text-red-800 font-bold">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1A0A00]/40 uppercase tracking-widest ml-1" htmlFor="email">
                  Institutional Email
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-300 group-focus-within:text-[#8B0000] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@iuea.ac.ug"
                    required
                    className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 bg-white outline-none focus:border-[#8B0000] transition-all text-[#1A0A00] font-bold placeholder:text-gray-200 placeholder:font-medium shadow-sm hover:border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-xs font-black text-[#1A0A00]/40 uppercase tracking-widest" htmlFor="password">
                    Secure Password
                  </label>
                  <button type="button" className="text-[10px] font-black text-[#8B0000] uppercase tracking-widest hover:underline opacity-50">
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-gray-300 group-focus-within:text-[#8B0000] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-14 pr-14 py-5 rounded-2xl border-2 border-gray-100 bg-white outline-none focus:border-[#8B0000] transition-all text-[#1A0A00] font-bold placeholder:text-gray-200 shadow-sm hover:border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#8B0000] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[64px] bg-[#8B0000] text-white rounded-2xl font-black text-lg hover:bg-[#700000] active:scale-[0.98] transition-all shadow-2xl shadow-red-900/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign Into Portal
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </motion.div>
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                Protected by <span className="text-[#1A0A00]">IUEA Security Protocols</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
