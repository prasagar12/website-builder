"use client"

import { componentMetadata } from "@/lib/component-registry"
import type { ComponentType, LayoutBlock } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Lock } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import clsx from "clsx"

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentType) => void
  layout: LayoutBlock[]
}

export function ComponentLibrary({
  onAddComponent,
  layout,
}: ComponentLibraryProps) {
  const categories = [
    "Navigation",
    "Header",
    "Content",
    "E-commerce",
    "Social Proof",
    "Forms",
    "Conversion",
  ]
  const componentsByCategory = Object.entries(componentMetadata).reduce(
    (acc, [type, meta]) => {
      if (!acc[meta.category]) acc[meta.category] = []
      acc[meta.category].push({ type: type as ComponentType, ...meta })
      return acc
    },
    {} as Record<
      string,
      Array<{ type: ComponentType } & (typeof componentMetadata)[ComponentType]>
    >
  )

  const totalComponents = Object.keys(componentMetadata).length
  const usedComponents = layout.length
  const progressValue = Math.min(
    Math.round((usedComponents / totalComponents) * 100),
    100
  )

  return (
    <div className="flex h-full flex-col">
      {/* ================= HEADER ================= */}
      <div className="border-border bg-background sticky top-0 z-10 border-b p-4 space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Components</h2>
          <p className="text-xs text-muted-foreground">
            {usedComponents} of {totalComponents} components used
          </p>
        </div>

        {/* PROGRESS */}
        <div className="space-y-1">
          <Progress value={progressValue} className="h-2" />
          <p className="text-[11px] text-muted-foreground text-right">
            {progressValue}% complete
          </p>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <Tabs defaultValue="components" className="flex h-187.5  flex-col">
        <TabsContent value="components" className="flex-1  overflow-auto  p-3 space-y-">
          {categories.map(
            (category) =>
              componentsByCategory[category] && (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {category}
                  </h3>

                  <div className="space-y-2">
                    {componentsByCategory[category].map((component) => {
                      const isAdded = layout.some(
                        (block) => block.type === component.type
                      )

                      return (
                        <Card
                          key={component.type}
                          onClick={() =>
                            !isAdded && onAddComponent(component.type)
                          }
                          className={clsx(
                            "transition-all",
                            isAdded
                              ? "cursor-not-allowed border-dashed bg-muted/50"
                              : "cursor-pointer hover:border-primary"
                          )}
                        >
                          <div className="flex items-start gap-3 p-3">
                            {/* ICON */}
                            <div
                              className={clsx(
                                "text-2xl",
                                isAdded && "opacity-40"
                              )}
                            >
                              {component.icon}
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4
                                  className={clsx(
                                    "text-sm font-medium",
                                    isAdded && "text-muted-foreground"
                                  )}
                                >
                                  {component.name}
                                </h4>

                                {isAdded ? (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 shrink-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {component.description}
                              </p>

                              {isAdded && (
                                <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                  Already added
                                </span>
                              )}
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
