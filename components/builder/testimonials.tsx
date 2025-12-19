"use client"

import { useEffect, useState } from "react"
import type { TestimonialsConfig } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
}

export function Testimonials({ config, websiteId }: { config: TestimonialsConfig; websiteId?: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

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

  if (config.layout === "variant-2") {
    // Variant 2: Large single column with emphasis
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto  px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Clients Say</h2>
          <div className="mx-auto max-w-3xl space-y-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg italic text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Grid layout
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">What Our Clients Say</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardContent className="flex-1 pt-6">
                <p className="mb-4 italic text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
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
      layout: "variant-1", // Default layout
    },
  },
  related: {
    settings: "TestimonialsSettings",
  },
}
