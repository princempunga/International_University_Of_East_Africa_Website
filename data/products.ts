export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  isBestseller?: boolean
  isNew?: boolean
  image: string
  images?: string[]
  slug: string
  colors?: string[]
  sizes?: string[]
  description: string
  rating: number
  reviews: number
}

export const products: Product[] = []
