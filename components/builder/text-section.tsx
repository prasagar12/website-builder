"use client"

import type { TextSectionConfig } from "@/lib/types"

export function TextSection({ config }: { config: TextSectionConfig }) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  if (config.layout === "variant-2") {
   
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary/20 bg-primary/5 p-8">
            <div className={alignmentClasses[config.alignment || "left"]}>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{config.heading}</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-muted-foreground">{config.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Variant 1 (default): Simple layout
  return (
    <section className="py-5  ">
      <div className="container mx-auto px-4">
        <div className={alignmentClasses[config.alignment || "left"]}>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{config.heading}</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground">{config.content}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

TextSection.craft = {
  displayName: "Text Section",
  props: {
    config: {
      heading: "Heading Text",
      content: "Your content goes here. Edit this text to match your needs.",
      alignment: "left",
      layout: "variant-1", // Added layout prop with default value
    },
  },
  related: {
    settings: "TextSectionSettings",
  },
}
