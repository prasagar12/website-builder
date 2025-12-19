"use client"

import type { CTAConfig } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA({ config, websiteId }: { config: CTAConfig; websiteId?: string }) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  }

  const buttonHref =
    config.buttonLinkType === "page" && config.buttonLink
      ? `/render/${websiteId}/${config.buttonLink}`
      : config.buttonLink || "#"

  if (config.layout === "variant-2") {
    // Variant 2: Side-by-side layout
    return (
      <section className={`py-16 ${variantClasses[config.variant || "default"]}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">{config.title}</h2>
              <p className="text-lg opacity-90">{config.description}</p>
            </div>
            <div>
              <Button size="lg" variant="secondary" asChild>
                <Link href={buttonHref}>{config.buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Centered layout
  return (
    <section className={`py-20 ${variantClasses[config.variant || "default"]}`}>
      <div className="container px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight">{config.title}</h2>
        <p className="mb-8 text-lg opacity-90">{config.description}</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href={buttonHref}>{config.buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}

CTA.craft = {
  displayName: "Call to Action",
  props: {
    config: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers today",
      buttonText: "Start Now",
      variant: "default",
      buttonLinkType: "page", // Added buttonLinkType
      buttonLink: "", // Added buttonLink
      layout: "variant-1", // Added layout
    },
  },
  related: {
    settings: "CTASettings",
  },
}
