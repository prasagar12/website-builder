// "use client"

// import { componentMetadata } from "@/lib/component-registry"
// import type { ComponentType, LayoutBlock } from "@/lib/types"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Plus, Lock } from "lucide-react"
// import { Tabs, TabsContent } from "@/components/ui/tabs"
// import clsx from "clsx"
// import { useState } from "react"
// import { componentPreviews } from "./preview/component-preview"

// interface ComponentLibraryProps {
//   onAddComponent: (type: ComponentType) => void
//   layout: LayoutBlock[]
// }

// export function ComponentLibrary({
//   onAddComponent,
//   layout,
// }: ComponentLibraryProps) {
//   const [expanded, setExpanded] = useState<ComponentType | null>(null)



//   const categories = [
//     "Navigation",
//     "Header",
//     "Content",
//     "E-commerce",
//     "Social Proof",
//     "Forms",
//     "Conversion",
//   ]
//   const componentsByCategory = Object.entries(componentMetadata).reduce(
//     (acc, [type, meta]) => {
//       if (!acc[meta.category]) acc[meta.category] = []
//       acc[meta.category].push({ type: type as ComponentType, ...meta })
//       return acc
//     },
//     {} as Record<
//       string,
//       Array<{ type: ComponentType } & (typeof componentMetadata)[ComponentType]>
//     >
//   )

//   const totalComponents = Object.keys(componentMetadata).length
//   const usedComponents = layout.length
//   const progressValue = Math.min(
//     Math.round((usedComponents / totalComponents) * 100),
//     100
//   )

//   return (
//     <div className="flex h-full flex-col">
//       {/* ================= HEADER ================= */}
//       <div className="border-border bg-background sticky top-0 z-10 border-b p-4 space-y-3">
//         <div>
//           <h2 className="text-lg font-semibold">Components</h2>
//           <p className="text-xs text-muted-foreground">
//             {usedComponents} of {totalComponents} components used
//           </p>
//         </div>

//         {/* PROGRESS */}
//         <div className="space-y-1">
//           <Progress value={progressValue} className="h-2" />
//           <p className="text-[11px] text-muted-foreground text-right">
//             {progressValue}% complete
//           </p>
//         </div>
//       </div>

//       {/* ================= BODY ================= */}
//       <Tabs defaultValue="components" className="flex h-187.5  flex-col">
//         <TabsContent value="components" className="flex-1  overflow-auto  p-3 space-y-">
//           {categories.map(
//             (category) =>
//               componentsByCategory[category] && (
//                 <div key={category} className="space-y-2">
//                   <h3 className="text-sm font-medium text-muted-foreground">
//                     {category}
//                   </h3>

//                   <div className="space-y-2">
//                     {componentsByCategory[category].map((component) => {
//                       const isAdded = layout.some(
//                         (block) => block.type === component.type
//                       )
// const Preview = componentPreviews[component.type]

//                       return (
//                         <Card
//                           key={component.type}
//                           onClick={() =>{
//                             !isAdded && onAddComponent(component.type)
//                                 setExpanded(
//       expanded === component.type ? null : component.type
//     )

//                           }}
//                           className={clsx(
//                             "transition-all",
//                             isAdded
//                               ? "cursor-not-allowed border-dashed bg-muted/50"
//                               : "cursor-pointer hover:border-primary"
//                           )}
//                         >
//                           <div className="flex items-start gap-3 p-3">
//                             {/* ICON */}
//                             <div
//                               className={clsx(
//                                 "text-2xl",
//                                 isAdded && "opacity-40"
//                               )}
//                             >
//                               {component.icon}
//                             </div>

//                             {/* CONTENT */}
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center justify-between gap-2">
//                                 <h4
//                                   className={clsx(
//                                     "text-sm font-medium",
//                                     isAdded && "text-muted-foreground"
//                                   )}
//                                 >
//                                   {component.name}
//                                 </h4>

//                                 {isAdded ? (
//                                   <Lock className="h-4 w-4 text-muted-foreground" />
//                                 ) : (
//                                   <Button
//                                     size="icon"
//                                     variant="ghost"
//                                     className="h-6 w-6 shrink-0"
//                                   >
//                                     <Plus className="h-3 w-3" />
//                                   </Button>
//                                 )}
//                               </div>

//                               <p className="mt-1 text-xs text-muted-foreground">
//                                 {component.description}
//                               </p>

//   {expanded === component.type && Preview && (
//       <div className="mt-3">
//         <Preview />
//       </div>
//     )}

//                               {isAdded && (
//                                 <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
//                                   Already added
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </Card>
//                       )
//                     })}
//                   </div>
//                 </div>
//               )
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }






"use client"

import { useState } from "react"
import clsx from "clsx"
import { Plus } from "lucide-react"

import { componentMetadata } from "@/lib/component-registry"
import type { ComponentType, LayoutBlock } from "@/lib/types"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentType, variant?: string) => void
  layout: LayoutBlock[]
}

export function ComponentLibrary({
  onAddComponent,
  layout,
}: ComponentLibraryProps) {
  const [expanded, setExpanded] = useState<ComponentType | null>(null)

  const categories = [
    // "Navigation",
    "Header",
    "Content",
    "E-commerce",
    "Social Proof",
    "Forms",
    "Conversion",
  ]

  /* ---------------------------------------------
   Group components by category
  --------------------------------------------- */
  const componentsByCategory = Object.entries(componentMetadata).reduce(
    (acc, [type, meta]) => {
      if (!acc[meta.category]) acc[meta.category] = []
      acc[meta.category].push({
        type: type as ComponentType,
        ...meta,
      })
      return acc
    },
    {} as Record<string, any[]>
  )

  /* ---------------------------------------------
   Progress indicator
  --------------------------------------------- */
  const totalComponents = Object.keys(componentMetadata).length
  const usedComponents = layout.length
  const progressValue = Math.min(
    Math.round((usedComponents / totalComponents) * 100),
    100
  )

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-10 border-b bg-background p-4 space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Components</h2>
          <p className="text-xs text-muted-foreground">
            {usedComponents} blocks added
          </p>
        </div>

        <Progress value={progressValue} className="h-2" />
      </div>

      {/* BODY */}
      <Tabs defaultValue="components" className="flex flex-col h-[800px]">
        <TabsContent value="components" className="flex-1 overflow-auto p-3 space-y-4">
          {categories.map(
            (category) =>
              componentsByCategory[category] && (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {category}
                  </h3>

                  {componentsByCategory[category].map((component) => {
                    const isExpanded = expanded === component.type
                    const hasVariants = component.variants?.length > 0

                    return (
                      <Card
                        key={component.type}
                        onClick={() =>
                          setExpanded(isExpanded ? null : component.type)
                        }
                        className={clsx(
                          "cursor-pointer transition-all",
                          isExpanded && "border-primary"
                        )}
                      >
                        <div className="p-3 space-y-3">
                          {/* HEADER ROW */}
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{component.icon}</div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="flex items-center justify-between text-sm font-medium">
                                  <span>{component.name}</span>

                                  {/* <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      onAddComponent(component.type)
                                    }}
                                    className="ml-24 cursor-pointer flex h-6 w-6   items-center justify-center rounded hover:bg-muted transition"
                                    title="Add component"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button> */}
                                </h4>




                                {/* Default Add (no variants) */}
                                {!hasVariants && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      onAddComponent(component.type)
                                    }}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {component.description}
                              </p>
                            </div>
                          </div>

                          {/* VARIANTS GRID */}
                          {isExpanded && hasVariants && (
                            <div className="grid grid-cols-2 gap-2">
                              {component.variants.map((variant: any) => (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onAddComponent(
                                      component.type,
                                      variant.id
                                    )
                                  }}
                                  key={variant.id}
                                  className="group relative overflow-hidden rounded-md border hover:border-primary"
                                >
                                  {/* Thumbnail */}
                                  <Image
                                    width={100}
                                    height={100}
                                    src={variant.imageUrl}
                                    alt={variant.name}
                                    className="h-24 w-full object-contain"
                                  />

                                  {/* Hover Overlay */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                                  {/* Variant Label */}
                                  <div className="p-2 text-xs font-medium">
                                    {variant.name}
                                  </div>
                                  <div className="hidden  group-hover:block absolute top-15 right-12">
                                    <Plus />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
