"use client"

import { useEffect, useState } from "react"
import type { ProductListConfig, Website } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export function ProductList({
  config,
  websiteId,
  website,
}: {
  config: ProductListConfig
  websiteId?: string
  website: Website
}) {
  const [products, setProducts] = useState<Product[]>([])

  // THEME (same everywhere)
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#8b5cf6",
    accent: "#10b981",
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  useEffect(() => {
    fetch(getApiUrl("PRODUCT_LIST", websiteId))
      .then((res) => res.json())
      .then((data) => {
        const limited = config.limit ? data.slice(0, config.limit) : data
        setProducts(limited)
      })
      .catch(() => {
        setProducts([
          { id: "1", name: "Product 1", description: "Great product", price: 99.99 },
          { id: "2", name: "Product 2", description: "Amazing product", price: 149.99 },
          { id: "3", name: "Product 3", description: "Fantastic product", price: 199.99 },
        ])
      })
  }, [config.limit, websiteId])

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Horizontal list */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-10"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4 space-y-5">
          {products.map((product) => (
            <Card
              key={product.id}
              className="transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 10px 30px -12px ${theme.accent}40`,
              }}
            >
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3
                    className="mb-1 text-xl font-semibold"
                    style={{ color: theme.primary, fontFamily: font.heading }}

                  >
                    {product.name}
                  </h3>

                  <p
                    className="text-base"
                    style={{ color: theme.primary, opacity: 0.8, fontFamily: font.heading }}

                  >
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {config.showPrice && (
                    <p
                      className="text-2xl font-bold"
                      style={{ color: theme.accent }}
                    >
                      ₹{product.price.toFixed(2)}
                    </p>
                  )}

                  <Button
                    style={{
                      backgroundColor: theme.accent,
                      color: "#ffffff",
                    }}
                  >
                    View Details
                  </Button>
                </div>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 12px 30px -12px ${theme.accent}40`,
              }}
            >
              {/* IMAGE (optional) */}
              {product.image && (
                <div className="relative h-48 border bo w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                   
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: theme.primary }}
                >
                  {product.name}
                </h3>

                <p
                  className="mb-4 flex-1 text-base"
                  style={{ color: theme.primary, opacity: 0.8 }}
                >
                  {product.description}
                </p>

                {config.showPrice && (
                  <p
                    className="mb-4 text-2xl font-bold"
                    style={{ color: theme.accent }}
                  >
                    ₹{product.price.toFixed(2)}
                  </p>
                )}

                <Button
                  className="w-full cursor-pointer"
                  style={{
                    backgroundColor: theme.accent,
                    color: "#ffffff",
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


ProductList.craft = {
  displayName: "Product List",
  props: {
    config: {
      limit: 6,
      showPrice: true,
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
    settings: "ProductListSettings",
  },
}
