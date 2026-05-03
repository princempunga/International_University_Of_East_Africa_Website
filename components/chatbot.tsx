"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, User, Bot, ChevronRight } from "lucide-react"
import Image from "next/image"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const QUICK_QUESTIONS = [
  "What are the admission requirements?",
  "What programs do you offer?",
  "How much are the tuition fees?",
  "How can I contact the university?",
]

const BOT_RESPONSES: Record<string, string> = {
  "What are the admission requirements?": "For undergraduate programs, you need UACE (A-Level) with 2 principal passes and UCE (O-Level) with at least 5 passes. International students need their documents equated by UNEB.",
  "What programs do you offer?": "IUEA offers programs in Science & Technology, Engineering, Business & Management, and Law. Popular courses include IT, Software Engineering, BBA, and LLB.",
  "How much are the tuition fees?": "Fees vary by program. Semester fees range from approx. $500 to $1,000 USD for most programs. You can find the detailed fee structure in our Admissions section.",
  "How can I contact the university?": "You can reach us at Plot 1112/1121, Kansanga Ggaba Road, Kampala. Call our toll-free line: 800 335 335 or email info@iuea.ac.ug.",
  "default": "I'm the IUEA Assistant. I can help with admissions, programs, and general info. Please choose a question or type below!"
}

import { usePathname } from "next/navigation"

export function Chatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to IUEA. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // All hooks must run before any early return
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Do not show chatbot on login or admin pages
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) return null

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: BOT_RESPONSES[text] || BOT_RESPONSES["default"],
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#8B0000] text-[#E8B84B] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8B84B] relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#8B0000] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center p-1">
                  <Image src="/Website-Logo.png" alt="IUEA Logo" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold">IUEA Assistant</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online | Ready to help
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F0E8]/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-[#8B0000] text-white rounded-tr-none"
                        : "bg-white text-[#1A0A00] shadow-sm rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-semibold py-1.5 px-3 bg-[#F5F0E8] text-[#8B0000] rounded-full hover:bg-[#8B0000] hover:text-white transition-colors border border-[#8B0000]/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#8B0000] text-sm outline-none"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8B0000] text-white rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-2">
                Powered by IUEA Innovation Hub
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
