"use client"

import { useEffect, useState } from "react"
import type { ProductListConfig } from "@/lib/types"
import { getApiUrl } from "@/lib/api-endpoints"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export function ProductList({ config, websiteId }: { config: ProductListConfig; websiteId?: string }) {
  const [products, setProducts] = useState<Product[]>([])

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

  if (config.layout === "variant-2") {
    // Variant 2: Compact horizontal list
    return (
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl font-bold">{product.name}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {config.showPrice && <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>}
                    <Button>View Details</Button>
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
    <section className="py-5">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {config.showPrice && <p className="text-2xl font-bold">₹{product.price.toFixed(2)}</p>}
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
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
      layout: "variant-1", // Default layout
    },
  },
  related: {
    settings: "ProductListSettings",
  },
}
