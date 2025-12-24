"use client"

import { Navbar } from "@/components/builder/navbar"

const mockWebsite = {
  colors: {
    primary: "#0f172a",
    secondary: "#ffffff",
    accent: "#22c55e",
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
  },
}

const baseConfig = {
  brandName: "My Website",
  links: [
    { label: "Home", pageId: "home" },
    { label: "About", pageId: "about" },
  ],
}

export function NavbarPreview() {
  return (
    <div className="space-y-3 rounded-md border bg-muted/30 p-2">
      {/* Variant 1 */}
      <div className="scale-[0.6] origin-top pointer-events-none">
        <Navbar
          config={{ ...baseConfig, layout: "variant-1", id: 'navbar1' }}
          website={mockWebsite}
        />
      </div>

      {/* Variant 2 */}
      <div className="scale-[0.6] origin-top pointer-events-none">
        <Navbar
          config={{ ...baseConfig, layout: "variant-2", id: 'navbar2' }}
          website={mockWebsite}
        />
      </div>
    </div>
  )
}
