import type { Website, Page, LayoutBlock } from "./types"

// Local storage utilities for persisting data
// In production, this would be replaced with actual database calls

const STORAGE_KEY_WEBSITES = "nocode-builder-websites"
const STORAGE_KEY_CURRENT = "nocode-builder-current"

export class StorageManager {
  // Get all websites
  static getWebsites(): Website[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(STORAGE_KEY_WEBSITES)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  // Save all websites
  static saveWebsites(websites: Website[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY_WEBSITES, JSON.stringify(websites))
    } catch (error) {
      console.error("Failed to save websites:", error)
    }
  }

  // Get a single website
  static getWebsite(websiteId: string): Website | null {
    const websites = this.getWebsites()
    return websites.find((w) => w.id === websiteId) || null
  }

  // Save a website
  static saveWebsite(website: Website): void {
    const websites = this.getWebsites()
    const index = websites.findIndex((w) => w.id === website.id)

    if (index >= 0) {
      websites[index] = website
    } else {
      websites.push(website)
    }
    this.saveWebsites(websites)
  }

  // Delete a website
  static deleteWebsite(websiteId: string): void {
    const websites = this.getWebsites()
    const filtered = websites.filter((w) => w.id !== websiteId)
    this.saveWebsites(filtered)
  }

  // Get a specific page from a website
  static getPage(websiteId: string, pageId: string): Page | null {
    const website = this.getWebsite(websiteId)
    if (!website) return null

    return website.pages.find((p) => p.id === pageId) || null
  }

  // Save a page
  static savePage(websiteId: string, page: Page): void {
    const website = this.getWebsite(websiteId)
    if (!website) return

    const pageIndex = website.pages.findIndex((p) => p.id === page.id)

    if (pageIndex >= 0) {
      website.pages[pageIndex] = page
    } else {
      website.pages.push(page)
    }

    this.saveWebsite(website)
  }

  // Update page layout
  static updatePageLayout(websiteId: string, pageId: string, layout: LayoutBlock[]): void {
    const page = this.getPage(websiteId, pageId)
    if (!page) return

    page.layout = layout
    this.savePage(websiteId, page)
  }

  // Current context (selected website and page)
  static getCurrentContext(): { websiteId: string | null; pageId: string | null } {
    if (typeof window === "undefined") return { websiteId: null, pageId: null }

    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT)
      return data ? JSON.parse(data) : { websiteId: null, pageId: null }
    } catch {
      return { websiteId: null, pageId: null }
    }
  }

  static setCurrentContext(websiteId: string | null, pageId: string | null): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify({ websiteId, pageId }))
    } catch (error) {
      console.error("Failed to save context:", error)
    }
  }
}

