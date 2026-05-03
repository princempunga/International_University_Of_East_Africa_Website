export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  isBestseller?: boolean
  isNew?: boolean
  image: string
  slug: string
  colors?: string[]
  sizes?: string[]
  description: string
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "IUEA Classic T-Shirt",
    price: 45000,
    category: "T-Shirts & Hoodies",
    isBestseller: true,
    image: "/shop/T-shirt.png",
    slug: "iuea-classic-t-shirt",
    colors: ["Red", "White", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Our signature heavyweight cotton tee featuring the iconic IUEA logo. Perfect for daily campus wear.",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "IUEA Premium Hoodie",
    price: 95000,
    category: "T-Shirts & Hoodies",
    isNew: true,
    image: "/shop/hoodie.png",
    slug: "iuea-hoodie-premium",
    colors: ["Crimson", "Gray", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium fleece hoodie with embroidered university crest. Features a kangaroo pocket and adjustable hood.",
    rating: 4.9,
    reviews: 86
  },
  {
    id: 3,
    name: "IUEA Elegant Polo",
    price: 65000,
    category: "T-Shirts & Hoodies",
    image: "/shop/polo-shirt.png",
    slug: "iuea-polo-shirt",
    colors: ["White", "Crimson", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Elegant polo shirt made from breathable pique cotton. Subtle IUEA branding for a smart-casual look.",
    rating: 4.7,
    reviews: 52
  },
  {
    id: 4,
    name: "Graduation Gown Set",
    price: 250000,
    category: "Graduation Items",
    image: "/shop/graduation-gown.png",
    slug: "iuea-graduation-gown-set",
    description: "Official university graduation attire including gown, cap, and faculty-specific hood.",
    rating: 5.0,
    reviews: 140
  },
  {
    id: 5,
    name: "IUEA Branded Cap",
    price: 35000,
    category: "Accessories",
    isBestseller: true,
    image: "/shop/cap.png",
    slug: "iuea-branded-cap",
    colors: ["Red", "Black", "White"],
    description: "Classic adjustable cap with high-quality embroidery. Perfect for sunny days on campus.",
    rating: 4.6,
    reviews: 95
  },
  {
    id: 6,
    name: "IUEA Campus Backpack",
    price: 120000,
    category: "Accessories",
    isNew: true,
    image: "/shop/bag.png",
    slug: "iuea-backpack-30l",
    colors: ["Black", "Crimson"],
    description: "Durable 30L backpack with multiple compartments and a padded laptop sleeve.",
    rating: 4.8,
    reviews: 42
  },
  {
    id: 7,
    name: "IUEA Laptop Bag",
    price: 85000,
    category: "Accessories",
    image: "/shop/laptopbag.png",
    slug: "iuea-laptop-bag-15",
    description: "Slim and professional laptop case with IUEA branding. Fits up to 15-inch devices.",
    rating: 4.5,
    reviews: 31
  },
  {
    id: 8,
    name: "Insulated Water Bottle",
    price: 28000,
    originalPrice: 35000,
    category: "Accessories",
    image: "/shop/bottle-water.png",
    slug: "iuea-water-bottle-750ml",
    colors: ["Red", "Black", "Silver"],
    description: "Eco-friendly stainless steel water bottle. Keeps drinks cold for up to 24 hours.",
    rating: 4.7,
    reviews: 67
  },
  {
    id: 9,
    name: "IUEA Premium Notebook",
    price: 18000,
    category: "Stationery",
    image: "/shop/notebook.png",
    slug: "iuea-notebook-premium-a4",
    description: "Hardcover lined notebook with premium 100gsm paper. Features the IUEA seal on the cover.",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 10,
    name: "IUEA Branded Pen",
    price: 12000,
    category: "Stationery",
    isBestseller: true,
    image: "/shop/pen.png",
    slug: "iuea-pen-set-5-pcs",
    description: "A smooth-writing gel pen with the IUEA logo. Essential for every student.",
    rating: 4.5,
    reviews: 156
  },
  {
    id: 11,
    name: "IUEA Women's Bag",
    price: 95000,
    category: "Accessories",
    isNew: true,
    image: "/shop/bagfemal.png",
    slug: "iuea-womens-bag",
    description: "Stylish and spacious bag designed for the modern IUEA female student.",
    rating: 4.9,
    reviews: 28
  },
  {
    id: 12,
    name: "Ceramic University Mug",
    price: 22000,
    category: "Stationery",
    image: "/shop/cup.png",
    slug: "iuea-mug-ceramic",
    colors: ["White/Red", "Black/Gold"],
    description: "Ceramic coffee mug with high-gloss finish. Perfect for late-night study sessions.",
    rating: 4.7,
    reviews: 74
  },
  {
    id: 13,
    name: "USB Flash Drive 32GB",
    price: 35000,
    category: "Electronics",
    image: "/shop/flash.png",
    slug: "iuea-usb-flash-drive-32gb",
    description: "High-speed 32GB USB 3.0 flash drive with a sleek metal IUEA-engraved casing.",
    rating: 4.4,
    reviews: 45
  },
  {
    id: 14,
    name: "IUEA Phone Case",
    price: 20000,
    category: "Electronics",
    image: "/shop/phonecase.png",
    slug: "iuea-phone-case",
    description: "Universal protective phone case with a stylish IUEA pattern. Slim and durable.",
    rating: 4.3,
    reviews: 58
  },
  {
    id: 15,
    name: "IUEA Official Motorcycle",
    price: 4500000,
    category: "Vehicles",
    isNew: true,
    image: "/shop/motocycle.png",
    slug: "iuea-branded-motorcycle",
    description: "Official IUEA Campus Edition Bajaj Boxer. Features university colors and custom decals.",
    rating: 5.0,
    reviews: 5
  },
  {
    id: 16,
    name: "IUEA Campus Bicycle",
    price: 650000,
    category: "Vehicles",
    image: "/shop/becycle.png",
    slug: "iuea-bicycle-campus-edition",
    description: "Lightweight alloy frame bicycle with IUEA branding. The perfect way to commute around campus.",
    rating: 4.8,
    reviews: 12
  },
  {
    id: 17,
    name: "IUEA Graphic T-Shirt",
    price: 45000,
    category: "T-Shirts & Hoodies",
    image: "/shop/T-shirt1.png",
    slug: "iuea-graphic-t-shirt",
    colors: ["Black", "Gray"],
    sizes: ["M", "L", "XL"],
    description: "Contemporary graphic tee featuring artistic IUEA typography. Stand out on campus.",
    rating: 4.8,
    reviews: 42
  }
]
