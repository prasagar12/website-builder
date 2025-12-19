"use client"

import type { NavbarConfig } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Navbar({ config, websiteId }: { config: NavbarConfig; websiteId?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-border sticky top-0 z-0 border-b bg-background/95 backdrop-blur ssupports-backdrop-filter:bg-background/60">
      <div className="container  mx-auto flex h-16 items-center justify-between px-4">
        {config.logo ? (
          <Image
            width={48}
            height={48}
            src={config.logo}
            alt={config.brandName || "Logo"}
           
          />
        ) : (
          <span className="font-bold text-xl">{config.brandName}</span>
        )}
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {config.links?.map((link, index) => (
            <Link
              key={index}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-muted-foreground transition-colors hover:text-foreground text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-border border-t bg-background md:hidden">
          <div className="container flex flex-col gap-2 p-4">
            {config.links?.map((link, index) => (
              <Link
                key={index}
                href={`/render/${websiteId}/${link.pageId}`}
                className="text-muted-foreground transition-colors hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

Navbar.craft = {
  displayName: "Navigation Bar",
  props: {
    config: {
      brandName: "My Website",
      links: [
        { label: "Home", pageId: "home" },
        { label: "About", pageId: "about" },
      ],
    },
  },
  related: {
    settings: "NavbarSettings",
  },
}
