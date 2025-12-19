import type { LayoutBlock } from "./types"

// Layout storage and management utilities
export class LayoutManager {
  // Generate unique IDs for components
  static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Validate layout JSON structure
  static validateLayout(layout: LayoutBlock[]): boolean {
    try {
      if (!Array.isArray(layout)) return false

      for (const block of layout) {
        if (!block.type || !block.config || !block.config.id) {
          return false
        }
      }
      return true
    } catch {
      return false
    }
  }

  // Add a component to layout
  static addComponent(layout: LayoutBlock[], block: LayoutBlock): LayoutBlock[] {
    return [...layout, block]
  }

  // Remove a component from layout
  static removeComponent(layout: LayoutBlock[], blockId: string): LayoutBlock[] {
    return layout.filter((block) => block.config.id !== blockId)
  }

  // Reorder components in layout
  static reorderComponent(layout: LayoutBlock[], fromIndex: number, toIndex: number): LayoutBlock[] {
    const newLayout = [...layout]
    const [removed] = newLayout.splice(fromIndex, 1)
    newLayout.splice(toIndex, 0, removed)
    return newLayout
  }

  // Update component config
  static updateComponentConfig(
    layout: LayoutBlock[],
    blockId: string,
    newConfig: Partial<LayoutBlock["config"]>,
  ): LayoutBlock[] {
    return layout.map((block) =>
      block.config.id === blockId ? { ...block, config: { ...block.config, ...newConfig } } : block,
    )
  }

  // Export layout to JSON
  static exportLayout(layout: LayoutBlock[]): string {
    return JSON.stringify(layout, null, 2)
  }

  // Import layout from JSON
  static importLayout(json: string): LayoutBlock[] | null {
    try {
      const layout = JSON.parse(json)
      return this.validateLayout(layout) ? layout : null
    } catch {
      return null
    }
  }

  // Clone a layout block
  static cloneBlock(block: LayoutBlock): LayoutBlock {
    return {
      ...block,
      config: {
        ...block.config,
        id: this.generateId(),
      },
    }
  }
}

// Sample layout templates
export const layoutTemplates = {
  landing: [
    {
      type: "HERO" as const,
      config: {
        id: "hero-1",
        title: "Welcome to Our Platform",
        subtitle: "Build amazing websites without code",
        showButton: true,
        buttonText: "Get Started",
      },
    },
    {
      type: "SERVICE_GRID" as const,
      config: {
        id: "services-1",
        limit: 6,
        columns: 3 as const,
      },
    },
    {
      type: "TESTIMONIALS" as const,
      config: {
        id: "testimonials-1",
        limit: 3,
        autoplay: false,
      },
    },
    {
      type: "CTA" as const,
      config: {
        id: "cta-1",
        title: "Ready to Get Started?",
        description: "Join thousands of satisfied customers today",
        buttonText: "Start Free Trial",
        variant: "default" as const,
      },
    },
  ],
  about: [
    {
      type: "HERO" as const,
      config: {
        id: "hero-about",
        title: "About Us",
        subtitle: "Learn more about our story and mission",
        showButton: false,
      },
    },
    {
      type: "TEXT_SECTION" as const,
      config: {
        id: "text-1",
        heading: "Our Story",
        content:
          "We started with a simple mission: to make web development accessible to everyone. Today, we're proud to serve thousands of customers worldwide.",
        alignment: "center" as const,
      },
    },
    {
      type: "STATS" as const,
      config: {
        id: "stats-1",
        showIcons: true,
      },
    },
  ],
  services: [
    {
      type: "HERO" as const,
      config: {
        id: "hero-services",
        title: "Our Services",
        subtitle: "Comprehensive solutions for your business",
        showButton: true,
        buttonText: "Contact Us",
      },
    },
    {
      type: "SERVICE_GRID" as const,
      config: {
        id: "services-grid",
        limit: 9,
        columns: 3 as const,
      },
    },
  ],
}
