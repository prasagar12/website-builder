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
/* VARIANT 4 – Enterprise / Stats Layout */
/* ------------------------------------------------------------------ */
if (config.layout === "variant-4") {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto grid items-center gap-16 px-4 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div>
          <h1
            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
            style={{
              color: theme.primary,
              fontFamily: font.heading,
            }}
          >
            {config.title || "Build products that scale with your business"}
          </h1>

          <p
            className="mb-10 text-lg"
            style={{ color: theme.primary, opacity: 0.85 }}
          >
            {config.subtitle ||
              "We help startups and enterprises design, build, and launch high-performance digital products."}
          </p>

          {config.showButton && (
            <Button
              size="lg"
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
              asChild
            >
              <Link href={buttonHref}>
                {config.buttonText || "Get Started"}
              </Link>
            </Button>
          )}
        </div>

        {/* RIGHT TWO DIVS */}
        <div className="grid gap-6 sm:grid-cols-2">
          
          {/* CARD 1 */}
          <div className="rounded-3xl border bg-white p-6 shadow-md">
            <p className="mb-3 text-sm uppercase tracking-wide text-gray-500">
              Our Focus
            </p>
            <h3 className="mb-2 text-xl font-semibold text-black">
              Modern Development
            </h3>
            <p className="text-sm text-gray-600">
              Clean architecture, scalable systems and future-ready technology.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border bg-white p-6 shadow-md">
            <p className="mb-3 text-sm uppercase tracking-wide text-gray-500">
              Our Impact
            </p>
            <h3 className="mb-2 text-xl font-semibold text-black">
              Proven Results
            </h3>
            <p className="text-sm text-gray-600">
              250+ projects delivered with long-term client success.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}


      /* ------------------------------------------------------------------ */
/* VARIANT 3 – Glassmorphism / Premium CTA */
/* ------------------------------------------------------------------ */
if (config.layout === "variant-3") {
  return (
    <section
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* BG IMAGE */}
      {config.image && (
        <Image
          fill
          src={config.image}
          alt="Hero Background"
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border bg-white/20 p-10 text-center backdrop-blur-xl">
          <h1
            className="mb-4 text-4xl font-bold"
            style={{
              color: theme.primary,
              fontFamily: font.heading,
            }}
          >
            {config.title || "Build stunning websites faster"}
          </h1>

          <p
            className="mb-8 text-lg"
            style={{ color: theme.primary, opacity: 0.85 }}
          >
            {config.subtitle ||
              "Launch beautiful, high-performance websites with AI-powered components."}
          </p>

          {config.showButton && (
            <Button
              size="lg"
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
              asChild
            >
              <Link href={buttonHref}>
                {config.buttonText || "Start Building"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}


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
                className="mb-4  text-4xl font-bold line-clamp-4 md:text-3xl lg:text-4xl"
                style={{
                  color: theme.primary,
                  fontFamily: font.heading,
                }}
              >
                {config.title}
              </h1>
              <p
                className="mb-8 text-lg"
                style={{ color: theme.primary, opacity: 0.85 }}
              >
                {config.subtitle || "Leverage the power of AI to create stunning, responsive websites tailored to your needs in minutes."}
              </p>
              {config.showButton && (
                <Button size="lg"
                
                  style={{
                    backgroundColor: theme.accent,
                    color: "#ffffff",
                  }}
                  asChild
                >
                  <Link href={buttonHref} target="_blank">
                  
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
      className="relative  flex min-h-150 items-center justify-center overflow-hidden"
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
        className="absolute  inset-0"
        style={{ backgroundColor: theme.secondary, opacity: 0.6 }}
      />
      {/* Content */}
      <div className="container  relative z-10 px-4 py-24 text-center">
        <h1
          className="mb-4  text-4xl font-bold line-clamp-4 md:text-3xl lg:text-4xl"
          style={{ color: theme.primary }}
        >
          {config.title || "Build high-quality engineering effort"}
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
