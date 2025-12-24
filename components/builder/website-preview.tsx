"use client"

import { PageRenderer } from "@/components/page-renderer"
import type { Website } from "@/lib/types"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function WebsitePreview({
  website,
  websiteId,
}: {
  website: Website
  websiteId: string
}) {
  const page = website.pages[0]
  if (!page) return null

  return (
    <div className="group relative h-80 -mt-10  overflow-hidden rounded-lg border bg-background">
  {/* SCALE WRAPPER */}
  <div
    className="absolute top-0 left-0 origin-top-left"
    style={{
      transform: "scale(0.35)",
      width: "285%",
      height: "285%",
      pointerEvents: "none",
    }}
  >
    <PageRenderer
      layout={page.layout}
      websiteId={websiteId}
      website={website}
      isPreview
    />
  </div>

  {/* HOVER OVERLAY */}
  <Link
    href={`/render/${websiteId}/${page.id}`}
    target="_blank"
    className="
      absolute inset-0 z-10
      flex items-center justify-center
      bg-black/60
      opacity-0
      transition-opacity
      group-hover:opacity-100
    "
  >
    <span className="flex items-center gap-2 rounded-md bg-background px-3 py-1.5 text-sm font-medium shadow">
      Preview Site
      <ExternalLink className="h-4 w-4" />
    </span>
  </Link>

  {/* BORDER */}
  <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-border" />
</div>

  )
}
