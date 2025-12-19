import type React from "react"
import type { ComponentType } from "./types"
import { Navbar } from "@/components/builder/navbar" // Import navbar
import { Hero } from "@/components/builder/hero"
import { TextSection } from "@/components/builder/text-section"
import { ServiceGrid } from "@/components/builder/service-grid"
import { ProductList } from "@/components/builder/product-list"
import { Testimonials } from "@/components/builder/testimonials"
import { CTA } from "@/components/builder/cta"
import { Stats } from "@/components/builder/stats"
import { Footer } from "@/components/builder/footer" // Import footer
import ContactFrom from "@/components/builder/contact-from"

// Component registry maps component types to React components
export const componentRegistry: Record<ComponentType, React.ComponentType<any>> = {
  NAVBAR: Navbar, // Added navbar
  HERO: Hero,
  TEXT_SECTION: TextSection,
  SERVICE_GRID: ServiceGrid,
  PRODUCT_LIST: ProductList,
  TESTIMONIALS: Testimonials,
  CONTACT_FORM: ContactFrom,
  STATS: Stats,
  CTA: CTA,
  FOOTER: Footer, // Added footer
}

// Metadata for builder UI
export const componentMetadata = {
  NAVBAR: {
    name: "Navigation Bar",
    description: "Top navigation with links to pages",
    category: "Navigation",
    icon: "🧭",
  },
  HERO: {
    name: "Hero Section",
    description: "Large header section with title and call-to-action",
    category: "Header",
    icon: "🎯",
  },
  TEXT_SECTION: {
    name: "Text Section",
    description: "Simple text content with heading",
    category: "Content",
    icon: "📝",
  },
  SERVICE_GRID: {
    name: "Service Grid",
    description: "Grid layout displaying services",
    category: "Content",
    icon: "⚡",
  },
  PRODUCT_LIST: {
    name: "Product List",
    description: "Display products with pricing",
    category: "E-commerce",
    icon: "🛍️",
  },
  TESTIMONIALS: {
    name: "Testimonials",
    description: "Customer reviews and feedback",
    category: "Social Proof",
    icon: "💬",
  },
  CONTACT_FORM: {
    name: "Contact Form",
    description: "Form for visitor inquiries",
    category: "Forms",
    icon: "✉️",
  },
  STATS: {
    name: "Statistics",
    description: "Display key metrics and numbers",
    category: "Content",
    icon: "📊",
  },
  CTA: {
    name: "Call to Action",
    description: "Prominent call-to-action section",
    category: "Conversion",
    icon: "🎬",
  },
  FOOTER: {
    name: "Footer",
    description: "Bottom section with company info and links",
    category: "Navigation",
    icon: "📍",
  },
} as const
