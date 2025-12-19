"use client"

import { useEffect, useState } from "react"
import type { HeroConfig } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroData {
  backgroundImage?: string
}
export function Hero({ config, websiteId }: { config: HeroConfig; websiteId?: string }) {
  const [data, setData] = useState<HeroData | null>(null)

  useEffect(() => {
    fetch(getApiUrl("HERO", websiteId))
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({}))
  }, [websiteId])

  const buttonHref =
    config.buttonLinkType === "page" && config.buttonLink
      ? `/render/${websiteId}/${config.buttonLink}`
      : config.buttonLink || "#"

  if (config.layout === "variant-2") {
    // Variant 2: Side-by-side layout with image on right
    return (
      <section className="relative overflow-hidden bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {config.title}
              </h1>
              <p className="mb-8 text-pretty text-lg text-muted-foreground">{config.subtitle}</p>
              {config.showButton && (
                <Button size="lg" className="text-base" asChild>
                  <Link href={buttonHref} target="_blank">{config.buttonText || "Get Started"}</Link>
                </Button>
              )}
            </div>
            <div className="relative  overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-accent/20">
              {config.image ? (
                <Image
                  width={100}
                  height={120}
                  src={config.image}
                  alt={config.title || "Hero image"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Hero Image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Centered layout
  return (
   <section className="relative flex min-h-150 items-center justify-center overflow-hidden">
  {/* Background Image */}
  {config.image && (
    <img
      src={config.image}
      alt="Hero Background"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )}

  {/* Dark / Gradient Overlay for text readability */}
  <div className="absolute inset-0 bg-black/80" />

  {/* Content */}
  <div className="container relative z-10 px-4 py-24 text-center">
    <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
      {config.title}
    </h1>

   <p className="mb-8 max-w-2xl mx-auto overflow-hidden text-ellipsis  line-clamp-4 text-center text-lg text-white/90 md:text-xl">
  {config.subtitle}
</p>


    {config.showButton && (
      <Button variant="secondary" size="lg" className="text-base" asChild>
        <Link href={buttonHref}>{config.buttonText || "Get Started"}</Link>
      </Button>
    )}
  </div>
</section>

  )
}

// Builder-specific metadata
Hero.craft = {
  displayName: "Hero Section",
  props: {
    config: {
      title: "Welcome to Our Website",
      subtitle: "Build amazing experiences with our platform",
      showButton: true,
      buttonText: "Get Started",
      buttonLinkType: "page",
      buttonLink: "example-page",
      layout: "variant-1", // Default layout
    },
  },
  related: {
    settings: "HeroSettings",
  },
}
