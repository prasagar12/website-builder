"use client"

import { useState } from "react"
import { componentMetadata } from "@/lib/component-registry"
import type { ComponentType, LayoutBlock } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Props {
  onAdd: (type: ComponentType) => void
  layout: LayoutBlock[]
}

export function CenterAddSection({ onAdd ,layout}: Props) {
  const [open, setOpen] = useState(false)

  const components =Object.entries(componentMetadata).filter(([type, meta]) => !layout.find((item) => item.type === type))

  if(components.length===0){
    return null
  }
  return (
    <div className="flex border-2  container mx-auto  border-dashed border-black  rounded-xl  bg-gray-200 items-center justify-center py-24">
      <div className="relative">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="rounded-2xl border-dashed px-10  text-muted-foreground"
        >
          <Plus className="mr-2 h-5 w-5 cursor-pointer" />
          Add Section
        </Button>

        {open && (
          <div className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-xl border bg-background shadow-xl">
            <div className="p-2 max-h-80 overflow-auto">
              {components.map(([type, meta]) => (
                <button
                  key={type}
                  className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-muted"
                  onClick={() => {
                    onAdd(type as ComponentType)
                    setOpen(false)
                  }}
                >
                  <span className="text-xl">{meta.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{meta.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {meta.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
