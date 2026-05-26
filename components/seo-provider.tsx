"use client"

import { HelmetProvider } from "react-helmet-async"

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}
