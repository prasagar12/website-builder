"use client"

import { useEffect, useState } from "react"
import type { TestimonialsConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

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

  // 🔹edddddddd] THEME (single source of truth)
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
          { id: "1", name: "John  doe ", role: "CEO", content: "Excellent service!" },
          { id: "2", name: "Jane Smith", role: "Designer", content: "Highly recommend!" },
          { id: "3", name: "Bob Johnson", role: "Developer", content: "Amazing experience!" },
        ])
      })
  }, [config.limit, websiteId])  



  /* ------------------------------------------------------------------ */
  /* VARIANT 4 – Hero testimonial */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-4") {
    const t = testimonials[0]
    if (!t) return null

    return (
      <section
        className="py-20 text-center"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <Card
            className="p-10"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: `0 20px 45px -18px ${theme.accent}45`,
            }}
          >
            <blockquote
              className="text-2xl italic mb-8 leading-relaxed"
              style={{ color: theme.primary }}
            >
              “{t.content}”
            </blockquote>

            <div className="flex flex-col items-center">
              <Avatar
                className="h-16 w-16 mb-4"
                style={{ boxShadow: `0 0 0 3px ${theme.accent}` }}
              >
                <AvatarImage src={t.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <p
                className="font-semibold text-lg"
                style={{ color: theme.primary }}
              >
                {t.name}
              </p>
              <p
                className="text-sm"
                style={{ color: theme.primary, opacity: 0.6 }}
              >
                {t.role}
              </p>
            </div>
          </Card>
        </div>
      </section>
    )
  }



  /* ------------------------------------------------------------------ */
  /* VARIANT 3 – Nested cards */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-3") {
    return (
      <section className="py-6" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4 space-y-4">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="p-4"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 12px 30px -14px ${theme.accent}40`,
              }}
            >
              <div className="flex items-center gap-4">

                {/* LEFT CARD – AVATAR */}
                <Card
                  className="flex items-center justify-center"
                  style={{
                    width: 90,
                    height: 90,
                    backgroundColor: theme.secondary,
                    boxShadow: `0 6px 18px -8px ${theme.accent}50`,
                  }}
                >
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={t.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Card>

                {/* RIGHT CARD – CONTENT */}
                <Card
                  className="flex-1 p-4"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: `0 6px 18px -10px ${theme.accent}30`,
                  }}
                >
                  <p
                    className="mb-3 italic"
                    style={{ color: theme.primary, opacity: 0.85 }}
                  >
                    “{t.content}”
                  </p>

                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: theme.primary }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: theme.primary, opacity: 0.6 }}
                    >
                      {t.role}
                    </p>
                  </div>
                </Card>

              </div>
            </Card>
          ))}
        </div>
      </section>
    )
  }
  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Single column, premium */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="w-full py-5 md:py-5"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4">
          {/* HEADER */}
          <header className="mx-auto max-w-xl space-y-2 text-center mb-12">
            <h2
              className="text-4xl font-bold"
              style={{ color: theme.primary, fontFamily: font.heading }}
            >
              What Our Clients Say
            </h2>
            <p
              className="text-base"
              style={{ color: theme.primary, opacity: 0.7 }}
            >
              Hear directly from the people who have experienced our services.
            </p>
          </header>

          {/* CAROUSEL */}
          <div className="mx-auto container  ">
            <Carousel
              opts={{
                align: "start",
                loop: true,

              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((t, index) => (
                  <CarouselItem
                    key={t.id || index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card
                      className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: "#ffffff",
                        boxShadow: `0 12px 30px -12px ${theme.accent}40`,
                      }}
                    >
                      <CardContent className="flex grow  flex-col items-center justify-center p-6 text-center">
                        {/* QUOTE */}
                        <blockquote
                          className="text-lg leading-snug italic"
                          style={{ color: theme.primary, opacity: 0.85 }}
                        >
                          “{t.content}”
                        </blockquote>

                        {/* AUTHOR */}
                        <div className="mt-6 flex flex-col items-center">
                          <Avatar
                            className="h-12  w-12 border"
                            style={{
                              boxShadow: `0 0 0 2px ${theme.accent}`,
                            }}
                          >
                            <AvatarImage
                              src={t.avatar || "/placeholder.svg"}
                              alt={t.name}
                            />
                            <AvatarFallback>
                              {t.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="mt-4">
                            <div
                              className="font-semibold"
                              style={{ color: theme.primary }}
                            >
                              {t.name}
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: theme.primary, opacity: 0.6 }}
                            >
                              {t.role}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
      className="py-5"
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
