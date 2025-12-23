"use client"

import { useEffect, useState } from "react"
import type { TestimonialsConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
}

export function Testimonials({
  config,
  websiteId,
  website,
}: {
  config: TestimonialsConfig
  websiteId?: string
  website: Website
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  // 🔹 THEME (single source of truth)
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#f8fafc",
    accent: "#10b981",
  }

   const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  useEffect(() => {
    fetch(getApiUrl("TESTIMONIALS", websiteId))
      .then((res) => res.json())
      .then((data) => {
        const limited = config.limit ? data.slice(0, config.limit) : data
        setTestimonials(limited)
      })
      .catch(() => {
        setTestimonials([
          { id: "1", name: "John Doe", role: "CEO", content: "Excellent service!" },
          { id: "2", name: "Jane Smith", role: "Designer", content: "Highly recommend!" },
          { id: "3", name: "Bob Johnson", role: "Developer", content: "Amazing experience!" },
        ])
      })
  }, [config.limit, websiteId])

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Single column, premium */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-16"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="mb-12 text-center text-3xl font-bold"
            style={{ color: theme.primary , fontFamily: font.heading }}
          >
            What Our Clients Say
          </h2>

          <div className="mx-auto max-w-3xl space-y-8">
            {testimonials.map((t) => (
              <Card
                key={t.id}
                className="transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: `0 12px 30px -12px ${theme.accent}40`,
                }}
              >
                <div className="p-8">
                  <div className="mb-6 flex items-center gap-5">
                    <Avatar
                      className="h-16 w-16"
                      style={{
                        boxShadow: `0 0 0 3px ${theme.accent}`,
                      }}
                    >
                      <AvatarImage src={t.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: theme.primary }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: theme.primary, opacity: 0.7 }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-lg italic leading-relaxed"
                    style={{ color: theme.primary, opacity: 0.85 }}
                  >
                    “{t.content}”
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 1 – Grid layout */
  /* ------------------------------------------------------------------ */
  return (
    <section
      className="py-16"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="mb-12 text-center text-3xl font-bold"
          style={{ color: theme.primary, fontFamily: font.heading }}
        >
          What Our Clients Say
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 10px 26px -12px ${theme.accent}40`,
              }}
            >
              <div className="flex flex-1 flex-col p-6">
                <p
                  className="mb-6 italic"
                  style={{ color: theme.primary, opacity: 0.85 }}
                >
                  “{t.content}”
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <Avatar
                    style={{
                      boxShadow: `0 0 0 2px ${theme.accent}`,
                    }}
                  >
                    <AvatarImage src={t.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: theme.primary }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: theme.primary, opacity: 0.7 }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



Testimonials.craft = {
  displayName: "Testimonials",
  props: {
    config: {
      limit: 3,
      autoplay: false,
      layout: "variant-1",
    },
    website: {
      colors: {
        primary: "#000000",
        secondary: "#f8fafc",
        accent: "#10b981",
      },
    },
  },
  related: {
    settings: "TestimonialsSettings",
  },
}
