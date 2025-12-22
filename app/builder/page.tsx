"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ComponentLibrary } from "@/components/builder/component-library"
import { SettingsPanel } from "@/components/builder/settings-panel"
import { LayoutPreview } from "@/components/layout-preview"
import { LayoutManager } from "@/lib/layout-manager"
import { StorageManager } from "@/lib/storage"
import { componentRegistry } from "@/lib/component-registry"
import type { LayoutBlock, ComponentType, Page, Website } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Eye, Download, Code, ArrowUp, ArrowDown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const websiteId = searchParams?.get("website") || "default-website"
  const pageId = searchParams?.get("page") || "default-page"

  const [layout, setLayout] = useState<LayoutBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [page, setPage] = useState<Page | null>(null)
  const [website, setWebsite] = useState<Website | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null) // Add drag state
  const { toast } = useToast()

  useEffect(() => {
    let loadedPage = StorageManager.getPage(websiteId, pageId)
    if (!loadedPage) {
      loadedPage = {
        id: pageId,
        name: "Home",
        path: "/",
        layout: [{
          type: 'HERO',
          config: {
            id: LayoutManager.generateId(),
            title: 'Welcome to Your Website',
            subtitle: 'This is a hero section. Customize it to make it your own!',
            showButton: true,
          }
        }],
      }
      StorageManager.savePage(websiteId, loadedPage)
    }

    setPage(loadedPage)
    setLayout(loadedPage.layout)

    const loadedWebsite = StorageManager.getWebsite(websiteId)
    setWebsite(loadedWebsite)
  }, [websiteId, pageId])

  
  const saveLayout = (newLayout: LayoutBlock[]) => {
    setLayout(newLayout)
    StorageManager.updatePageLayout(websiteId, pageId, newLayout)
  }

  const handleAddComponent = (type: ComponentType) => {
    const Component = componentRegistry[type]
    const defaultConfig = (Component as any).craft?.props?.config || {}

    const newBlock: LayoutBlock = {
      type,
      config: {
        ...defaultConfig,
        id: LayoutManager.generateId(),
      },
    }

    const newLayout = LayoutManager.addComponent(layout, newBlock)
    saveLayout(newLayout)
    setSelectedBlockId(newBlock.config.id)

    toast({
      title: "Component added",
      description: `${type.replace(/_/g, " ")} has been added to the page.`,
    })
  }

  const handleUpdateConfig = (blockId: string, newConfig: Partial<LayoutBlock["config"]>) => {
    const newLayout = LayoutManager.updateComponentConfig(layout, blockId, newConfig)
    saveLayout(newLayout)
  }

  const handleDeleteBlock = (blockId: string) => {
    const newLayout = LayoutManager.removeComponent(layout, blockId)
    saveLayout(newLayout)
    setSelectedBlockId(null)

    toast({
      title: "Component removed",
      description: "The component has been removed from the page.",
    })
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newLayout = [...layout]
    const draggedItem = newLayout[draggedIndex]
    newLayout.splice(draggedIndex, 1)
    newLayout.splice(index, 0, draggedItem)
    setLayout(newLayout)
    setDraggedIndex(index)
  }
  const handleDragEnd = () => {
    if (draggedIndex !== null) {
      saveLayout(layout)
    }
    setDraggedIndex(null)
  }

  const selectedBlock = layout.find((b) => b.config.id === selectedBlockId) || null

  return (
    <div className="flex h-screen flex-col">
      <div className="border-border bg-background flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Page Builder</h1>
          {page && <span className="text-muted-foreground text-sm">/ {page.name}</span>}
 
            <Button variant="outline" size="sm" asChild>
            <Link href='/' target="_blank">
              <ArrowLeft className="mr-2 h-3 w-4" />
              Back
            </Link>
          </Button>

        </div>

        <div className="flex items-center gap-2">
          

          <Button size="sm" asChild>
            <Link href={`/preview/${websiteId}/${pageId}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="border-border w-80 shrink-0 overflow-hidden border-r">
          <ComponentLibrary onAddComponent={handleAddComponent} />
        </div>

        <div className="bg-muted/30 flex-1 overflow-auto">
          <div className="mx-auto min-h-full max-w-6xl">
            <LayoutPreview
              layout={layout}
              websiteId={websiteId}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              onDragStart={handleDragStart} 
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDelete={handleDeleteBlock}
            />
          </div>
        </div>

        <div className="border-border w-80 shrink-0 overflow-hidden border-l">
          <SettingsPanel
            block={selectedBlock}
            onUpdate={handleUpdateConfig}
            onDelete={handleDeleteBlock}
            pages={website?.pages || []}
            websiteId={websiteId}
          />
        </div>
      </div>
    </div>
  )
}
