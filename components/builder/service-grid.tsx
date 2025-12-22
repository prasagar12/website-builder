"use client"

import { useEffect, useState } from "react"
import type { ServiceGridConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card } from "@/components/ui/card"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
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

  useEffect(() => {
    fetch(getApiUrl("SERVICE_GRID", websiteId))
      .then((res) => res.json())
      .then((data) => {
        const limited = config.limit ? data.slice(0, config.limit) : data
        setServices(limited)
      })
      .catch(() => {
        setServices([
          { id: "1", title: "Service 1", description: "Description for service 1" },
          { id: "2", title: "Service 2", description: "Description for service 2" },
          { id: "3", title: "Service 3", description: "Description for service 3" },
        ])
      })
  }, [config.limit, websiteId])

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Horizontal list cards */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-10"
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
              <div className="p-6 hover:-translate-y-0.5">
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: theme.primary }}
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
      className="py-10"
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
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: theme.primary }}
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
