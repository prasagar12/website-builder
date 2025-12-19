"use client"

import { useEffect, useState } from "react"
import type { ServiceGridConfig } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

export function ServiceGrid({ config, websiteId }: { config: ServiceGridConfig; websiteId?: string }) {
  const [services, setServices] = useState<Service[]>([])

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

  if (config.layout === "variant-2") {
    // Variant 2: Horizontal cards with border accent
    return (
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {services.map((service) => (
              <Card key={service.id} className="border-l-4 border-l-primary transition-shadow hover:shadow-lg">
                <div className="flex flex-col p-3 md:flex-row md:items-center md:gap-6">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Grid cards
  return (
    <section className="py-5 ">
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 ${gridCols[config.columns || 3]}`}>
          {services.map((service) => (
            <Card key={service.id} className="transition-shadow  hover:shadow-lg">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
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
      layout: "variant-1", // Added layout prop
    },
  },
  related: {
    settings: "ServiceGridSettings",
  },
}
