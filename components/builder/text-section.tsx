"use client"

import type { TextSectionConfig, Website } from "@/lib/types"

export function TextSection({
  config,
  website,
}: {
  config: TextSectionConfig
  website: Website
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  // 🔹 THEME (same contract as Navbar & Hero)
  const theme = website?.colors || {
    primary: "#000000",   // TEXT
    secondary: "#8b5cf6", // BACKGROUND
    accent: "#10b981",    // HIGHLIGHT
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 – Card / Highlight layout */
  /* ------------------------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-16"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4">
          <div
            className="mx-auto max-w-3xl rounded-2xl p-8"
            style={{
              backgroundColor: "#ffffff",
              border: `2px solid ${theme.accent}40`,
            }}
          >
            <div className={alignmentClasses[config.alignment || "left"]}>
              <h2
                className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
                style={{ color: theme.primary }}
              >
                {config.heading}
              </h2>

              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.primary, opacity: 0.85 }}
              >
                {config.content}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------------ */
  /* VARIANT 1 – Simple layout (default) */
  /* ------------------------------------------------------------------ */
  return (
    <section
      className="py-10"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto px-4">
        <div className={alignmentClasses[config.alignment || "left"]}>
          <h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: theme.primary }}
          >
            {config.heading}
          </h2>

          <p
            className="max-w-3xl text-lg leading-relaxed"
            style={{ color: theme.primary, opacity: 0.85 }}
          >
            {config.content}
          </p>
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
      layout: "variant-1",
    },
    website: {
      colors: {
        primary: "#000000",
        secondary: "#8b5cf6",
        accent: "#10b981",
      },
    },
  },
  related: {
    settings: "TextSectionSettings",
  },
}
