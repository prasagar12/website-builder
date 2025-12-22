"use client"

import type { FooterConfig, Website } from "@/lib/types"
import Link from "next/link"

export function Footer({
  config,
  websiteId,
  website,
}: {
  config: FooterConfig
  websiteId?: string
  website: Website
}) {
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#f8fafc",
    accent: "#10b981",
  }

  return (
    <footer
      style={{ backgroundColor: theme.primary }}
      className="relative"
    >
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* BRAND */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {config.companyName}
            </h3>

            {config.description && (
              <p className="max-w-sm text-sm text-white/70">
                {config.description}
              </p>
            )}
          </div>

          {/* LINKS */}
          {config.showLinks && config?.links?.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Quick Links
              </h4>

              <div className="flex flex-col gap-2">
                {config?.links.map((link, index) => (
                  <Link
                    key={index}
                    href={`/render/${websiteId}/${link.pageId}`}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = theme.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "rgba(255,255,255,0.7)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div
          className="mt-10 border-t pt-6 text-center"
          style={{ borderColor: `${theme.accent}40` }}
        >
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {config.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

Footer.craft = {
  displayName: "Footer",
  props: {
    config: {
      companyName: "My Company",
      description: "Building amazing digital experiences",
      showLinks: true,
      links: [
        { label: "Home", pageId: "home" },
        { label: "About", pageId: "about" },
      ],
    },
  },
  related: {
    settings: "FooterSettings",
  },
}
