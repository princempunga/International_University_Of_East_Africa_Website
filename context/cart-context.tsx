"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
  category: string
  slug: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, size?: string, color?: string) => void
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  toast: { show: boolean, message: string }
  showToast: (message: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2000)
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem('iuea_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('iuea_cart', JSON.stringify(cart))
    }
  }, [cart, isMounted])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      )

      if (existingItemIndex > -1) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += item.quantity
        return newCart
      }

      return [...prevCart, item]
    })
  }

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCart((prevCart) => 
      prevCart.filter((i) => !(i.id === id && i.size === size && i.color === color))
    )
  }

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) return
    setCart((prevCart) => {
      const newCart = [...prevCart]
      const index = newCart.findIndex((i) => i.id === id && i.size === size && i.color === color)
      if (index > -1) {
        newCart[index].quantity = quantity
      }
      return newCart
    })
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, toast, showToast }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
