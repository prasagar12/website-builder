"use client"

import { componentMetadata } from "@/lib/component-registry"
import type { ComponentType } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Layout } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentType) => void
}

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const categories = [ "Navigation", "Header", "Content", "E-commerce", "Social Proof", "Forms", "Conversion"]
  const componentsByCategory = Object.entries(componentMetadata).reduce(
    (acc, [type, meta]) => {
      if (!acc[meta.category]) {
        acc[meta.category] = []
      }
      acc[meta.category].push({ type: type as ComponentType, ...meta })
      return acc
    },
    {} as Record<string, Array<{ type: ComponentType } & (typeof componentMetadata)[ComponentType]>>,
  )

  return (
    <div className="flex h-full flex-col">
      <div className="border-border bg-background sticky top-0 z-10 border-b p-4">
        <h2 className="text-lg font-semibold">Components</h2>
        <p className="text-muted-foreground text-sm">Click to add to page</p>
      </div>

      <Tabs defaultValue="components" className="flex h-full  flex-col">
        {/* <TabsList className="mx-4 mt-4">
          <TabsTrigger value="components" className="flex-1">
            Components
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">
            Layout
          </TabsTrigger>
        </TabsList> */}

  

        <TabsContent value="components" className="flex-1 overflow-auto p-2 space-y-6 mt-0">
          {categories.map(
            (category) =>
              componentsByCategory[category] && (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">{category}</h3>
                  <div className="space-y-2">
                    {componentsByCategory[category].map((component) => (
                      <Card
                        key={component.type}
                        className="hover:border-primary cursor-pointer transition-colors"
                        onClick={() => onAddComponent(component.type)}
                      >
                        <div className="flex items-start gap-3 p-3">
                          <div className="text-2xl">{component.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-medium">{component.name}</h4>
                              <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0">
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs">{component.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
          )}
        </TabsContent>

        {/* <TabsContent value="layout" className="flex-1 overflow-auto p-4 mt-0">
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Spacing</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Select a component   first, then adjust its layout settings in the right panel.
            </p>
          </div>

          <Card className="p-4 border-dashed">
            <div className="flex items-center gap-3">
              <Layout className="h-8 w-8 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Layout Controls</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Layout options appear in the settings panel when you select a component.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

