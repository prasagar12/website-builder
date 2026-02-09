"use client"

import type { CTAConfig, Website } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA({
  config,
  websiteId,
  website,
}: {
  config: CTAConfig
  websiteId?: string
  website: Website
}) {
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#f8fafc",
    accent: "#10b981",
  }


  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  const buttonHref =
    config.buttonLinkType === "page" && config.buttonLink
      ? `/render/${websiteId}/${config.buttonLink}`
      : config.buttonLink || "#"

  /* ---------------- Variant 2 ---------------- */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-16 border "
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:text-left">
            <div className="flex-1">
              <h2
                className="mb-2 text-3xl font-bold tracking-tight"
                style={{ color: theme.primary, fontFamily: font.heading }}

              >
                {config.title}
              </h2>
              <p
                className="text-lg"
                style={{ color: theme.primary, opacity: 0.75 }}
              >
                {config.description}
              </p>
            </div>

            <Button
              size="lg"
              asChild
              style={{
                backgroundColor: theme.accent,
                color: "#ffffff",
                boxShadow: `0 16px 32px -14px ${theme.accent}80`,
              }}
            >
              <Link href={buttonHref}>{config.buttonText}</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  /* ---------------- Variant 1 (Default) ---------------- */
  return (
    <section
      className="py-20 text-center"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container px-4">
        <h2
          className="mb-4 text-4xl font-bold tracking-tight"
          style={{ color: theme.primary }}
        >
          {config.title}
        </h2>

        <p
          className="mx-auto mb-8 max-w-2xl text-lg"
          style={{ color: theme.primary, opacity: 0.75 }}
        >
          {config.description}
        </p>

        <Button
          size="lg"
          asChild
          style={{
            backgroundColor: theme.accent,
            color: "#ffffff",
            boxShadow: `0 18px 36px -14px ${theme.accent}90`,
          }}
        >
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
      buttonLinkType: "page",
      buttonLink: "",
      layout: "variant-1",
    },
  },
  related: {
    settings: "CTASettings",
  },
}
