"use client"

import { useEffect, useState } from "react"
import type { ServiceGridConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  image?: string
}

export function ServiceGrid({
  config,
  websiteId,
  website,
}: {
  config: ServiceGridConfig
  websiteId?: string
  website: Website
}) {
  const [services, setServices] = useState<Service[]>([])

  // 🔹 THEME (same contract everywhere)
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#8b5cf6",
    accent: "#10b981",
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }



  useEffect(() => {
    fetch(getApiUrl("SERVICE_GRID", websiteId))
      .then((res) => res.json())
      .then((data) => {
        const limited = config.limit ? data.slice(0, config.limit) : data
        setServices(limited)
      })
      .catch(() => {
        setServices([
          { id: "1", title: "Service 1", description: "Description for service 1", image: "" },
          { id: "2", title: "Service 2", description: "Description for service 2", image: "" },
          { id: "3", title: "Service 3", description: "Description for service 3", image: "" },
        ])
      })
  }, [config.limit, websiteId])

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }



/* ------------------------------------------------------------------ */
/* VARIANT 4 – Centered marketing cards */
/* ------------------------------------------------------------------ */
if (config.layout === "variant-4") {
  return (
    <section className="py-10" style={{ backgroundColor: theme.secondary }}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="text-center p-6 hover:-translate-y-1 transition-all"
              style={{
                backgroundColor: "#fff",
                boxShadow: `0 14px 35px -12px ${theme.accent}50`,
              }}
            >
              {/* IMAGE */}
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.title}
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
              )}

              <h3
                className="text-xl font-bold mb-2"
                style={{ color: theme.primary }}
              >
                {service.title}
              </h3>

              <p
                className="text-sm"
                style={{ color: theme.primary, opacity: 0.85 }}
              >
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



/* ------------------------------------------------------------------ */
/* VARIANT 3 – Image/Icon left, content right */
/* ------------------------------------------------------------------ */
if (config.layout === "variant-3") {
  return (
    <section className="py-5" style={{ backgroundColor: theme.secondary }}>
      <div className="container mx-auto px-4 space-y-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="p-4"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: `0 10px 30px -12px ${theme.accent}40`,
            }}
          >
            <div className="flex gap-4 items-center">
              
              {/* LEFT CARD – IMAGE */}
              <Card
                className="flex items-center justify-center p-2"
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: theme.secondary,
                  boxShadow: `0 6px 18px -6px ${theme.accent}50`,
                }}
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={70}
                    height={70}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <span
                    className="text-sm font-semibold"
                    style={{ color: theme.primary }}
                  >
                    No Image
                  </span>
                )}
              </Card>

              {/* RIGHT CARD – CONTENT */}
              <Card
                className="flex-1 p-4"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: `0 6px 18px -8px ${theme.accent}30`,
                }}
              >
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: theme.primary }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: theme.primary, opacity: 0.85 }}
                >
                  {service.description}
                </p>
              </Card>

            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}


  

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Horizontal list cards */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-5"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4 space-y-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: `4px solid ${theme.accent}`,
                boxShadow: `0 10px 30px -12px ${theme.accent}40`,
              }}
            >
              <div className="p-2 hover:-translate-y-0.5">
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{
                    color: theme.primary,
                    fontFamily: font.heading
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: theme.primary, opacity: 0.85 }}
                >
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 1 – Grid cards (default) */
  /* ------------------------------------------------------------------ */
  return (
    <section
      className="py-5"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 ${gridCols[config.columns || 3]}`}>
          {services.map((service) => (
            <Card
              key={service.id}
              className="transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 12px 30px -12px ${theme.accent}40`,
              }}
            >
             <div className="p-6">
  {/* IMAGE */}
  {service.image && (
    <div className="relative mb-4 w-full overflow-hidden rounded-lg border">
      <Image
        src={service.image}
        alt={service.title}
        width={400}
        height={300}
        className="h-48 w-full "
      />
    </div>
  )}

  {/* TITLE */}
  <h3
    className="mb-1 text-xl font-semibold"
    style={{ color: theme.primary }}
  >
    {service.title}
  </h3>

  {/* SUBTITLE / DESCRIPTION */}
  <p
    className="text-base leading-relaxed"
    style={{ color: theme.primary, opacity: 0.85 }}
  >
    {service.description}
  </p>
</div>


            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


ServiceGrid.craft = {
  displayName: "Service Grid",
  props: {
    config: {
      limit: 6,
      columns: 3,
      layout: "variant-1",
    },
    website: {
      colors: {
        primary: "#000000",
        secondary: "#8b5cf6",
        accent: "#10b981",
      },
    },
  },
  related: {
    settings: "ServiceGridSettings",
  },
}
