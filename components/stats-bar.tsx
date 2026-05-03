"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Users, BookOpen, GraduationCap, Handshake, TrendingUp } from "lucide-react"

const stats = [
  { icon: Users, value: 9000, suffix: "+", label: "Students" },
  { icon: BookOpen, value: 62, suffix: "+", label: "Programs" },
  { icon: GraduationCap, value: 24000, suffix: "+", label: "Graduates" },
  { icon: Handshake, value: 45, suffix: "+", label: "Partnerships" },
  { icon: TrendingUp, value: 92, suffix: "%", label: "Employment" },
]

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { count, ref }
}

function StatItem({ icon: Icon, value, suffix, label, index }: {
  icon: typeof Users
  value: number
  suffix: string
  label: string
  index: number
}) {
  const { count, ref } = useCountUp(value, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <Icon className="w-8 h-8 text-[#E8B84B] mb-3" />
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/80 mt-1">{label}</div>
    </motion.div>
  )
}

export function StatsBar() {
  return (
    <section className="bg-[#8B0000] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative flex justify-center">
              <StatItem {...stat} index={index} />
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#E8B84B]/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
