"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function ApplyPage() {
  const [countdown, setCountdown] = useState(3)
  const [progress, setProgress] = useState(0)
  const externalUrl = "https://applicants.iuea.ac.ug/"

  useEffect(() => {
    // Progress bar animation
    const startTime = Date.now()
    const duration = 3000 // 3 seconds

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
      }
    }, 16) // ~60fps

    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Redirection
    const redirectTimeout = setTimeout(() => {
      window.location.href = externalUrl
    }, 3500) // Slightly more than 3s to allow the "Redirecting" state to be seen

    return () => {
      clearInterval(progressInterval)
      clearInterval(countdownInterval)
      clearTimeout(redirectTimeout)
    }
  }, [externalUrl])

  return (
    <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center relative overflow-hidden">
      {/* Background Watermark Crest */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[800px] h-[800px] opacity-[0.04]">
          <Image
            src="/iuea-logo.png"
            alt="IUEA Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full">
        {/* IUEA Logo */}
        <div className="mb-8">
          <Image
            src="/iuea-logo.png"
            alt="IUEA Crest"
            width={80}
            height={80}
            className="object-contain mx-auto"
            priority
          />
        </div>

        {/* Headings */}
        <p className="text-[18px] text-[#6B7280] font-sans mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          You're being redirected to
        </p>
        <h1 className="text-[40px] font-bold text-[#1A0A00] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          IUEA Admissions Portal
        </h1>

        {/* Description */}
        <p className="text-[16px] text-[#6B7280] max-w-[400px] mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Our secure application system will open in this tab. Your progress will be saved automatically.
        </p>

        {/* Progress Bar Container */}
        <div className="w-[300px] mb-4">
          <div className="w-full h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8B0000] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Countdown Text */}
        <p className="text-[14px] text-[#6B7280] mb-12">
          {countdown > 0 ? `Redirecting... (${countdown}s)` : "Redirecting..."}
        </p>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <a 
            href={externalUrl}
            className="text-[#8B0000] font-bold text-[15px] underline hover:text-[#6B0000] transition-colors"
          >
            Click here if not redirected →
          </a>
          <Link 
            href="/admissions"
            className="text-[#6B7280] text-[14px] hover:text-[#1A0A00] transition-colors"
          >
            ← Go back to Admissions
          </Link>
        </div>
      </div>

      {/* Custom Font Imports if not already in layout */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');
      `}</style>
    </main>
  )
}
