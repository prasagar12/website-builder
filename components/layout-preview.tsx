"use client"

import type React from "react"

import { PageRenderer } from "./page-renderer"
import type { LayoutBlock } from "@/lib/types"
import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface LayoutPreviewProps {
  layout: LayoutBlock[]
  websiteId?: string
  selectedBlockId?: string | null
  onSelectBlock?: (blockId: string) => void
  onDragStart?: (index: number) => void // Add drag handlers
  onDragOver?: (e: React.DragEvent, index: number) => void
  onDragEnd?: () => void
  onDelete?: (blockId: string) => void
}

export function LayoutPreview({
  layout,
  websiteId,
  selectedBlockId,
  onSelectBlock,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDelete,
}: LayoutPreviewProps) {
  return (
    <div className="layout-preview h-full overflow-auto">
      <style jsx global>{`
        .layout-preview .block-wrapper {
          position: relative;
          transition: all 0.15s ease;
        }

        .layout-preview .block-wrapper:hover {
          outline: 2px solid hsl(var(--primary) / 0.5);
          outline-offset: -2px;
        }

        .layout-preview .block-wrapper.selected {
          outline: 2px solid hsl(var(--primary));
          outline-offset: -2px;
          background: hsl(var(--muted) / 0.3);
        }

        .layout-preview .block-controls {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.15s ease;
          display: flex;
          gap: 4px;
        }

        .layout-preview .block-wrapper:hover .block-controls,
        .layout-preview .block-wrapper.selected .block-controls {
          opacity: 1;
        }

        .layout-preview .drag-handle {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          opacity: 0;
          transition: opacity 0.15s ease;
          cursor: grab;
        }

        .layout-preview .drag-handle:active {
          cursor: grabbing;
        }

        .layout-preview .block-wrapper:hover .drag-handle,
        .layout-preview .block-wrapper.selected .drag-handle {
          opacity: 1;
        }
      `}</style>

      <div>
        {layout.map((block, index) => (
          <div
            key={block.config.id}
            className={`block-wrapper ${selectedBlockId === block.config.id ? "selected" : ""}`}
            draggable // Make draggable
            onDragStart={() => onDragStart?.(index)}
            onDragOver={(e) => onDragOver?.(e, index)}
            onDragEnd={onDragEnd}
            onClick={(e) => {
              e.stopPropagation()
              onSelectBlock?.(block.config.id)
            }}
          >
            <div className="drag-handle">
              <Button size="icon" variant="secondary" className="h-8 w-8 cursor-grab active:cursor-grabbing shadow-md">
                <GripVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="block-controls">
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8 shadow-md"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(block.config.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <PageRenderer layout={[block]} websiteId={websiteId} isPreview />
          </div>
        ))}
      </div>
    </div>
  )
}
