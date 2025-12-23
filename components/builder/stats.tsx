"use client"

import { useEffect, useState } from "react"
import type { StatsConfig, Website } from "@/lib/types"
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

export function Stats({
  config,
  websiteId,
  website,
}: {
  config: StatsConfig
  websiteId?: string
  website: Website
}) {
  const [stats, setStats] = useState<Stat[]>([])

  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#f8fafc",
    accent: "#10b981",
  }


// const font = website?.fonts || {
//     heading: "Inter, system-ui, sans-serif",
//   }

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

  /* ---------------- Variant 2 ---------------- */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-16"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon =
                stat.icon && iconMap[stat.icon as keyof typeof iconMap]

              return (
                <div
                  key={stat.id}
                  className="rounded-2xl p-6 text-center transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: `0 20px 40px -18px ${theme.accent}40`,
                  }}
                >
                  {config.showIcons && Icon && (
                    <Icon
                      className="mx-auto mb-4 h-10 w-10"
                      style={{ color: theme.accent }}
                    />
                  )}

                  <p
                    className="mb-1 text-5xl font-bold"
                    style={{ color: theme.primary }}
                  >
                    {stat.value}
                  </p>

                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.primary, opacity: 0.7 }}
                  >
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  /* ---------------- Variant 1 (Default) ---------------- */
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon =
              stat.icon && iconMap[stat.icon as keyof typeof iconMap]

            return (
              <div key={stat.id} className="text-center">
                {config.showIcons && Icon && (
                  <Icon
                    className="mx-auto mb-3 h-8 w-8"
                    style={{ color: theme.accent }}
                  />
                )}

                <p
                  className="mb-1 text-4xl font-bold"
                  style={{ color: theme.primary }}
                >
                  {stat.value}
                </p>

                <p
                  className="text-sm"
                  style={{ color: theme.primary, opacity: 0.65 }}
                >
                  {stat.label}
                </p>
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
      layout: "variant-1",
    },
  },
  related: {
    settings: "StatsSettings",
  },
}
