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
    variants: [
      {
        name: 'simple Hero',
        id: 'variant-1',
        imageUrl: '/hero/variant1.png'
      },
      {
        name: 'Modern Hero',
        id: 'variant-2',
        imageUrl: '/hero/variant2.png'
      }
    ]
  },
  TEXT_SECTION: {
    name: "Text Section",
    description: "Simple text content with heading",
    category: "Content",
    icon: "📝",
    variants: [
      {
        name: 'simple Text Section',
        id: 'variant-1',
        imageUrl: '/text/variant2.png'
      },
      {
        name: 'Modern Text Section',
        id: 'variant-2',
        imageUrl: '/text/variant1.png'
      }
    ]
  },
  SERVICE_GRID: {
    name: "Service Grid",
    description: "Grid layout displaying services",
    category: "Content",
    icon: "⚡",
    variants: [
      {
        name: 'Modern Service Grid',
        id: 'variant-1',
        imageUrl: '/service/variant1.png'
      },
      {
        name: 'Service columns',
        id: 'variant-2',
        imageUrl: '/service/variant2.png'
      }
    ]
  },

  PRODUCT_LIST: {
    name: "Product List",
    description: "Display products with pricing",
    category: "E-commerce",
    icon: "🛍️",
    variants: [
      {
        name: "Grid Cards",
        id: "variant-1",
        imageUrl: "/product/variant1.png",
      },
      {
        name: "List without Image",
        id: "variant-2",
        imageUrl: "/product/variant2.png",
      },
    ],
  },


 TESTIMONIALS: {
  name: "Testimonials",
  description: "Customer reviews and feedback",
  category: "Social Proof",
  icon: "💬",
  variants: [
    {
      name: "Card Grid",
      id: "variant-1",
      imageUrl: "/testimonials/variant1.png",
    },
    {
      name: "column List",
      id: "variant-2",
      imageUrl: "/testimonials/variant2.png",
    },
  ],
},

CONTACT_FORM: {
  name: "Contact Form",
  description: "Form for visitor inquiries",
  category: "Forms",
  icon: "✉️",
  variants: [
    {
      name: "Image + Form",
      id: "variant-1",
      imageUrl: "/contact/variant1.png",
    },
    {
      name: "Centered Form",
      id: "variant-2",
      imageUrl: "/contact/variant2.png",
    },
  ],
},



STATS: {
  name: "Statistics",
  description: "Display key metrics and numbers",
  category: "Content",
  icon: "📊",
  variants: [
    {
      name: "Simple Grid",
      id: "variant-1",
      imageUrl: "/stats/variant1.png",
    },
    {
      name: "Icon Cards",
      id: "variant-2",
      imageUrl: "/stats/variant2.png",
    },
  ],
},



CTA: {
  name: "Call to Action",
  description: "Prominent call-to-action section",
  category: "Conversion",
  icon: "🎬",
  variants: [
    {
      name: "Centered CTA",
      id: "variant-1",
      imageUrl: "/cta/variant1.png",
    },
    {
      name: "Split CTA",
      id: "variant-2",
      imageUrl: "/cta/variant2.png",
    },
  ],
},




  FOOTER: {
    name: "Footer",
    description: "Bottom section with company info and links",
    category: "Navigation",
    icon: "📍",
  },
} as const
