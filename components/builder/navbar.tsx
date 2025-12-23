"use client"

import type { NavbarConfig } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Navbar({
  config,
  websiteId,
  website,
}: {
  config: NavbarConfig
  websiteId?: string
  website: any
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  //🔹THEME (safe fallback for editor & preview)
  const theme = website?.colors
  // console.log(theme)
   const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }
  return (
    <nav
      style={{
        backgroundColor: theme.primary,
        color: theme.primary,
        fontFamily: font.heading,
      }}
      className="sticky top-0 z-50 border-b border-black/10"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO / BRAND */}
        {config.logo ? (
          <Image
            width={48}
            height={48}
            src={config.logo}
            alt={config.brandName || "Logo"}
          />
        ) : (
          <span
            className="text-xl font-bold tracking-wide"
            style={{ color: theme.secondary }}
          >
            {config.brandName}
          </span>
        )}

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">
          {config.links?.map((link, index) => (
            <Link
              key={index}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-sm font-medium transition-colors"
              style={{ color: theme.secondary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.secondary)
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE (ACTION COLOR) */}
        <Button
          size="icon"
          className="md:hidden"
          style={{
            backgroundColor: theme.accent,
            color: "#ffffff",
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: theme.secondary,
            borderTop: `1px solid ${theme.primary}20`,
          }}
        >
          <div className="container flex flex-col gap-2 p-4">
            {config.links?.map((link, index) => (
              <Link
                key={index}
                href={`/render/${websiteId}/${link.pageId}`}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: theme.secondary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
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
