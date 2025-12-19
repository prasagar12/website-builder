"use client"

import { useEffect, useState } from "react"
import type { StatsConfig } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { TrendingUp, Users, Award, Zap } from "lucide-react"

interface Stat {
  id: string
  label: string
  value: string
  icon?: string
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  award: Award,
  zap: Zap,
}

export function Stats({ config, websiteId }: { config: StatsConfig; websiteId?: string }) {
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    fetch(getApiUrl("STATS", websiteId))
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {
        setStats([
          { id: "1", label: "Active Users", value: "10K+", icon: "users" },
          { id: "2", label: "Success Rate", value: "99%", icon: "trending" },
          { id: "3", label: "Awards Won", value: "50+", icon: "award" },
          { id: "4", label: "Performance", value: "10x", icon: "zap" },
        ])
      })
  }, [websiteId])

  if (config.layout === "variant-2") {
    // Variant 2: Vertical cards with background
    return (
      <section className="py-16 bg-primary/5">
        <div className="container  mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : null
              return (
                <div key={stat.id} className="rounded-xl bg-background p-6 text-center shadow-sm">
                  {config.showIcons && Icon && <Icon className="mx-auto mb-3 h-10 w-10 text-primary" />}
                  <p className="mb-2 text-5xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Simple centered layout
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : null
            return (
              <div key={stat.id} className="text-center">
                {config.showIcons && Icon && <Icon className="mx-auto mb-3 h-8 w-8 text-primary" />}
                <p className="mb-1 text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

Stats.craft = {
  displayName: "Statistics",
  props: {
    config: {
      showIcons: true,
      layout: "variant-1", // Default layout
    },
  },
  related: {
    settings: "StatsSettings",
  },
}
