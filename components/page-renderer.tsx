"use client"

import type { LayoutBlock } from "@/lib/types"
import { componentRegistry } from "@/lib/component-registry"

interface PageRendererProps {
  layout: LayoutBlock[]
  websiteId?: string
  isPreview?: boolean
}

export function PageRenderer({ layout, websiteId, isPreview = false }: PageRendererProps) {
  if (!layout || layout.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No components added yet.</p>
          {isPreview && (
            <p className="mt-2 text-sm text-muted-foreground">Add components from the left panel to get started.</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page-renderer">
      {layout.map((block, index) => {
        const Component = componentRegistry[block.type]

        if (!Component) {
          console.error(`Component type "${block.type}" not found in registry`)
          return (
            <div key={block.config.id} className="border-destructive bg-destructive/10 border-2 p-8 text-center">
              <p className="text-destructive">Component type "{block.type}" not found</p>
            </div>
          )
        }

        return (
          <div key={block.config.id} data-block-id={block.config.id} data-block-index={index}>
            <Component config={block.config} websiteId={websiteId} />
          </div>
        )
      })}
    </div>
  )
}
