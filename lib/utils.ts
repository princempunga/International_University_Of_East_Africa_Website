import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return num.toLocaleString('en-US')
}

export function transformProduct(p: any) {
  if (!p) return null
  return {
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    originalPrice: p.sale_price ? parseFloat(p.sale_price) : undefined,
    category: p.category?.name || "Uncategorized",
    image: p.images?.[0] || "/placeholder-product.png",
    images: p.images || [],
    slug: p.slug,
    description: p.description,
    rating: 5, 
    reviews: Math.floor(Math.random() * 50) + 10,
    isNew: p.is_featured,
    isBestseller: p.is_featured,
    colors: p.colors || [],
    sizes: p.sizes || []
  }
}
