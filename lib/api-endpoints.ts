// API endpoints for each component type
// In production, these would fetch from actual backend APIs

export const API_ENDPOINTS = {
  HERO: "/api/hero",
  TEXT_SECTION: "/api/text-section",
  SERVICE_GRID: "/api/services",
  PRODUCT_LIST: "/api/products",
  TESTIMONIALS: "/api/testimonials",
  CONTACT_FORM: "/api/contact",
  STATS: "/api/stats",
  CTA: "/api/cta",
} as const

// Helper to get API endpoint with website context
export function getApiUrl(componentType: string, websiteId?: string): string {
  const baseUrl = API_ENDPOINTS[componentType as keyof typeof API_ENDPOINTS]
  if (websiteId) {
    return `${baseUrl}?websiteId=${websiteId}`
  }
  return baseUrl
}
