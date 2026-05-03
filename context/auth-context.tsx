"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface User {
  id: number
  name: string
  email: string
  role: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  token: string | null
  role: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('iuea_token')
      const storedUser = localStorage.getItem('iuea_user')
      const storedRole = localStorage.getItem('iuea_role')

      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
          setRole(storedRole)
          
          // Verify token with backend
          const response = await api.me()
          if (response.success) {
            setUser(response.data)
            localStorage.setItem('iuea_user', JSON.stringify(response.data))
            localStorage.setItem('iuea_role', response.data.role)
            setRole(response.data.role)
          } else {
            // Token invalid or expired
            clearAuthData()
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          clearAuthData()
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const clearAuthData = () => {
    localStorage.removeItem('iuea_token')
    localStorage.removeItem('iuea_user')
    localStorage.removeItem('iuea_role')
    setToken(null)
    setUser(null)
    setRole(null)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password)
      
      if (response.success) {
        const { token, user } = response.data
        
        localStorage.setItem('iuea_token', token)
        localStorage.setItem('iuea_user', JSON.stringify(user))
        localStorage.setItem('iuea_role', user.role)
        
        setToken(token)
        setUser(user)
        setRole(user.role)
        
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Connection failed. Please try again later.' }
    }
  }

  const logout = async () => {
    try {
      await api.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuthData()
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      role, 
      isAuthenticated: !!token, 
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
