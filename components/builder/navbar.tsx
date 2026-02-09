
"use client"

import type { NavbarConfig } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { NavbarSearch } from "../comman/navbar-search"

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

  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#10b981",
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }


/* ===================================================== */
/* VARIANT 4 – Minimal Pro / Dashboard */
/* ===================================================== */
if (config.layout === "variant-4") {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: theme.primary,
        fontFamily: font.heading,
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* BRAND */}
        <div className="flex items-center gap-3">
          {config.logo && (
            <Image src={config.logo} width={36} height={36} alt="Logo" />
          )}
          <span
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: theme.secondary }}
          >
            {config.brandName || "Brand"}
          </span>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {config.links?.map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="relative text-xs uppercase tracking-wider hover:opacity-80"
              style={{ color: theme.secondary }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ACTION */}
        <div className="flex items-center gap-3">
          <NavbarSearch theme={theme} />
          <Button
            size="sm"
            variant="outline"
            style={{
              borderColor: theme.accent,
              color: theme.accent,
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  )
}


  /* ===================================================== */
/* VARIANT 3 – Centered Logo / Glassmorphism */
/* ===================================================== */
if (config.layout === "variant-3") {
  return (
    <nav
      className="sticky top-4 z-50 mx-auto max-w-6xl rounded-2xl border backdrop-blur-md"
      style={{
        backgroundColor: `${theme.primary}cc`,
        fontFamily: font.heading,
      }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* LEFT LINKS */}
        <div className="hidden md:flex gap-6">
          {config.links?.slice(0, Math.ceil(config.links.length / 2)).map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.secondary }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-2">
          {config.logo ? (
            <Image src={config.logo} width={42} height={42} alt="Logo" />
          ) : (
            <span
              className="text-lg font-bold"
              style={{ color: theme.secondary }}
            >
              {config.brandName || "Brand"}
            </span>
          )}
        </div>

        {/* RIGHT LINKS */}
        <div className="hidden md:flex gap-6">
          {config.links?.slice(Math.ceil(config.links.length / 2)).map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.secondary }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE */}
        <Button
          size="icon"
          className="md:hidden"
          style={{ backgroundColor: theme.accent }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>
    </nav>
  )
}


  /* ===================================================== */
  /* VARIANT 2 – Modern / CTA Navbar */
  /* ===================================================== */
  if (config.layout === "variant-2") {
    return (
      <nav
        className="sticky top-0 z-50 mx-auto mt-2 max-w-7xl rounded-full border"
        style={{
          backgroundColor: theme.primary,
          fontFamily: font.heading,
        }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            {config.logo ? (
              <Image
                src={config.logo}
                width={44}
                height={44}
                alt="Logo"
                className="rounded-full"
              />
            ) : (
              <span
                className="text-xl font-bold"
                style={{ color: theme.secondary }}
              >
                {config.brandName || "Brand Name"}
              </span>
            )}
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {config.links?.map((link, i) => (
              <Link
                key={i}
                href={`/render/${websiteId}/${link.pageId}`}
                className="group relative text-sm font-medium transition"
                style={{ color: theme.secondary }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"
                  style={{ backgroundColor: theme.accent }}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT CTA */}
          <div className="hidden md:flex items-center gap-4">
            <NavbarSearch theme={theme} />
            <Button
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
            >
              Get Started
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <Button
            size="icon"
            className="md:hidden"
            style={{ backgroundColor: theme.accent }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden space-y-3 px-6 pb-4 pt-3">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none"
              />
            </div>

            {/* LINKS */}
            {config.links?.map((link, i) => (
              <Link
                key={i}
                href={`/render/${websiteId}/${link.pageId}`}
                className="block py-2 text-sm font-medium"
                style={{ color: theme.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button
              className="w-full"
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>
    )
  }

  /* ===================================================== */
  /* VARIANT 1 – Simple Navbar */
  /* ===================================================== */
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: theme.primary,
        fontFamily: font.heading,
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        {config.logo ? (
          <Image src={config.logo} width={44} height={44} alt="Logo" />
        ) : (
          <span
            className="text-xl font-bold"
            style={{ color: theme.secondary }}
          >
            {config.brandName || "Brand"}
          </span>
        )}

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {config.links?.map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-sm font-medium"
              style={{ color: theme.secondary }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <Button
          size="icon"
          className="md:hidden"
          style={{ backgroundColor: theme.accent }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden space-y-2 px-4 pb-4">
          {config.links?.map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="block py-2 text-sm"
              style={{ color: theme.secondary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
