// Component types available in the builder
export type ComponentType =
  | "NAVBAR" // Added navbar component type
  | "HERO"
  | "TEXT_SECTION"
  | "SERVICE_GRID"
  | "PRODUCT_LIST"
  | "TESTIMONIALS"
  | "CONTACT_FORM"
  | "STATS"
  | "CTA"
  | "FOOTER" // Added footer component type

// Base config that all components accept
export interface BaseConfig {
  id: string
  layout?: "variant-1" | "variant-2" | "variant-3" | "variant-4"
}

// Component-specific configs
export interface HeroConfig extends BaseConfig {
  title: string
  image?: string
  subtitle: string
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  buttonLinkType?: "page" | "external"
}

// Component-specific configs

export interface TextSectionConfig extends BaseConfig {
  heading: string
  content: string
  alignment?: "left" | "center" | "right"
}


// Service Grid Config


export interface ServiceGridConfig extends BaseConfig {
  limit?: number
  columns?: 2 | 3 | 4
}

export interface ProductListConfig extends BaseConfig {
  limit?: number
  showPrice?: boolean
}

export interface TestimonialsConfig extends BaseConfig {
  limit?: number
  autoplay?: boolean
}

export interface ContactFormConfig extends BaseConfig {
  title: string
  submitText?: string
}

export interface StatsConfig extends BaseConfig {
  showIcons?: boolean
}

export interface CTAConfig extends BaseConfig {
  title: string
  description: string
  buttonText: string
  variant?: "default" | "accent"
  buttonLink?: string // Add link field
  buttonLinkType?: "page" | "external" // Type of link
}

export interface NavbarConfig extends BaseConfig {
  brandName: string
  logo?: string 
  links: Array<{
    label: string
    pageId: string // Links to other pages in the website
  }>
}

export interface FooterConfig extends BaseConfig {
  companyName: string
  description?: string
  showLinks?: boolean
  links?: Array<{
    label: string
    pageId: string
  }>
}

// Union type for all possible configs
export type ComponentConfig =
  | NavbarConfig // Added navbar config
  | HeroConfig
  | TextSectionConfig
  | ServiceGridConfig
  | ProductListConfig
  | TestimonialsConfig
  | ContactFormConfig
  | StatsConfig
  | CTAConfig
  | FooterConfig // Added footer config

// Layout block structure
export interface LayoutBlock {
  type: ComponentType
  config: ComponentConfig
}

// Website and page structures
export interface Website {
  id: string
  name: string
  domain?: string 
  dns?: string 
  colors?: {
  
    primary: string
    secondary: string
    accent: string
  }
  fonts?: {
    heading: string

  }
  pages: Page[]

}

export interface Page {
  id: string
  name: string
  path: string
  layout: LayoutBlock[]
}
