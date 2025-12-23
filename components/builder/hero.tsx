"use client"

import { useEffect, useState } from "react"
import type { HeroConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroData {
  backgroundImage?: string
}

export function Hero({
  config,
  websiteId,
  website,
}: {
  config: HeroConfig
  websiteId?: string
  website: Website
}) {
  const [data, setData] = useState<HeroData | null>(null)
  useEffect(() => {
    fetch(getApiUrl("HERO", websiteId))
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({}))
  }, [websiteId])
  // 🔹 THEME (same contract as Navbar)
  const theme = website?.colors || {
    primary: "#000000",   // TEXT
    secondary: "#8b5cf6", // BACKGROUND
    accent: "#10b981",    // ACTION
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  const buttonHref =
    config.buttonLinkType === "page" && config.buttonLink
      ? `/render/${websiteId}/${config.buttonLink}`
      : config.buttonLink || "#"

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Side-by-side layout */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="relative overflow-hidden py-20"
        style={{
          backgroundColor: theme.secondary


        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* TEXT */}
            <div>
              <h1
                className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                style={{
                  color: theme.primary,
                  fontFamily: font.heading,
                }}
              >
                {config.title || "Build high-quality  engineering effort"}
              </h1>

              <p
                className="mb-8 text-lg"
                style={{ color: theme.primary, opacity: 0.85 }}
              >
                {config.subtitle || "Leverage the power of AI to create stunning, responsive websites tailored to your needs in minutes."}
              </p>

              {config.showButton && (
                <Button
                  size="lg"
                  style={{
                    backgroundColor: theme.accent,
                    color: "#ffffff",
                  }}
                  asChild
                >
                  <Link href={buttonHref}>
                    {config.buttonText || "Get Started"}
                  </Link>
                </Button>
              )}
            </div>

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-2xl">
              {config.image ? (
                <Image
                  width={600}
                  height={500}
                  src={config.image}
                  alt={config.title || "Hero image"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full items-center justify-center"
                  style={{ color: theme.primary, opacity: 0.6 }}
                >
                  Hero Image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 1 – Centered layout (default) */
  /* ------------------------------------------------------------------ */
  return (
    <section
      className="relative flex min-h-150 items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* Background Image */}
      {config.image && (
        <Image
        fill
          src={config.image}
          alt="Hero Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.secondary, opacity: 0.85 }}
      />

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 text-center">
        <h1
          className="mb-4 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: theme.primary }}
        >
          {config.title || "Build high-quality  engineering effort"}
        </h1>

        <p
          className="mx-auto mb-8 max-w-2xl text-lg md:text-xl"
          style={{ color: theme.primary, opacity: 0.9 }}
        >
          {config.subtitle || "Leverage the power of AI to create stunning, responsive websites tailored to your needs in minutes."}
        </p>

        {config.showButton && (
          <Button
            size="lg"
            style={{
              backgroundColor: theme.accent,
              color: "#ffffff",
            }}
            asChild
          >
            <Link href={buttonHref}>
              {config.buttonText || "Get Started"}
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
