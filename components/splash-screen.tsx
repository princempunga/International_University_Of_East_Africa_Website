"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Splash mounted')
    document.body.style.overflow = "hidden"
    
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = "unset"
    }, 2200)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const particleVariants = {
    animate: (i: number) => ({
      y: [-20, -100],
      opacity: [0, 0.4, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "linear"
      }
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeIn" }
          }}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 9999,
            backgroundColor: '#1A0A00'
          }}
          className="flex flex-col items-center justify-center p-4 overflow-hidden"
          variants={containerVariants}
          animate="animate"
        >
          {/* Subtle Particles - Only render on client */}
          {mounted && [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              animate="animate"
              className="absolute w-1 h-1 bg-[#E8B84B] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${60 + Math.random() * 30}%`
              }}
            />
          ))}

          <div className="flex flex-col items-center">
            {/* Step 1: Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6, 
                ease: "easeOut" 
              }}
              style={{
                width: '88px',
                height: '88px', 
                borderRadius: '50%',
                background: '#8B0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(139,0,0,0.6), 0 0 80px rgba(139,0,0,0.3)',
                marginBottom: '20px'
              }}
            >
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '2px'
              }}>
                I
              </span>
            </motion.div>

            {/* Step 2: Main Text */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-5xl sm:text-6xl font-serif font-bold text-white"
                style={{ marginBottom: '8px' }}
              >
                IUEA
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-[10px] sm:text-[12px] font-sans text-[#E8B84B] tracking-[0.3em] uppercase whitespace-nowrap"
                style={{ marginBottom: '20px' }}
              >
                International University of East Africa
              </motion.p>
            </div>

            {/* Step 3: Gold Line & Tagline */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeInOut" }}
                className="h-[1px] bg-[#E8B84B]"
                style={{ marginBottom: '16px' }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl sm:text-2xl font-serif italic text-white"
              >
                Learning to Succeed
              </motion.p>
            </div>
          </div>

          {/* Step 4: Loading Bar Styled properly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-[240px] h-[3px] bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 240 }}
                transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                className="h-full bg-[#E8B84B] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
