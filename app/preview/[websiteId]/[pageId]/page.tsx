"use client"

import { use, useEffect, useState } from "react"
import { PageRenderer } from "@/components/page-renderer"
import { StorageManager } from "@/lib/storage"
import type { Page, Website } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"


export default function PreviewPage({ params  }: { params: Promise<{ websiteId: string; pageId: string }> }) {
  const { websiteId, pageId } = use(params)
  const [page, setPage] = useState<Page | null>(null)
  const [website, setWebsite] = useState<Website | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPage = () => {
      const loadedPage = StorageManager.getPage(websiteId, pageId)
      const loadedWebsite = StorageManager.getWebsite(websiteId)
      setPage(loadedPage)
      setWebsite(loadedWebsite)
      setLoading(false)
    }
    loadPage()

    const handleStorageChange = () => {
      loadPage()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [websiteId, pageId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading preview...</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Page not found</p>
        <Button asChild>
          <Link href="/builder">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Builder
          </Link>
        </Button>
      </div>
    )
  }

  const navLinks =
    website?.pages.map((p) => ({
      label: p.name,
      pageId: p.id,
    })) || []

  return (
    <div className="min-h-screen ">
      <div className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur supports-backdrop-filter:bg-background/60">
        {/* <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/builder?website=${websiteId}&page=${pageId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Editor
              </Link>
            </Button>
            <div className="text-sm">
              <span className="text-muted-foreground">Previewing:</span>
              <span className="ml-2 font-medium">{page.name}</span>
            </div>
          </div>

          <Button size="sm" variant="outline" asChild>
            <Link href={`/render/${websiteId}/${pageId}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Full Site
            </Link>
          </Button>
        </div> */}
      </div>

      {/* <Navbar
        config={{
          brandName: website?.name || "My Website",
          links: navLinks,
        }}
        websiteId={websiteId}
      /> */}

      <PageRenderer layout={page.layout} websiteId={websiteId} website={website} />
{/* 
      <Footer
        config={{
          companyName: website?.name || "My Website",
          // description: website?.description || "Building amazing digital experiences",
          showLinks: true,
          links: navLinks,
        }}
        websiteId={websiteId}
      /> */}
    </div>
  )
}
