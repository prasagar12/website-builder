"use client"

import { use, useEffect, useState } from "react"
import { PageRenderer } from "@/components/page-renderer"
import { StorageManager } from "@/lib/storage"
import type { Page, Website } from "@/lib/types"
import { Navbar } from "@/components/builder/navbar"
import { Footer } from "@/components/builder/footer"

export default function RenderPage({ params }: { params: Promise<{ websiteId: string; pageId: string }> }) {
  const { websiteId, pageId } = use(params)
  const [page, setPage] = useState<Page | null>(null)
  const [website, setWebsite] = useState<Website | null>(null)

  useEffect(() => {
    const loadedPage = StorageManager.getPage(websiteId, pageId)
    const loadedWebsite = StorageManager.getWebsite(websiteId)
    setPage(loadedPage)
    setWebsite(loadedWebsite)
  }, [websiteId, pageId])

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Page not found</p>
      </div>
    )
  }

  const navLinks =
    website?.pages.map((p) => ({
      label: p.name,
      pageId: p.id,
    })) || []

  // Pure rendering without any builder UI - this is the final published version
  return (
    <div className="min-h-screen">
      {/* <Navbar
        config={{
          brandName: website?.name || "My Website",
          links: navLinks,
        }}
        websiteId={websiteId}
      /> */}

      <PageRenderer layout={page.layout} websiteId={websiteId} />

      {/* <Footer
        config={{
          companyName: website?.name || "My Website",
          description: website?.description || "Building amazing digital experiences",
          showLinks: true,
          links: navLinks,
        }}
        websiteId={websiteId}
      /> */}
    </div>
  )
}
