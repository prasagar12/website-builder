"use client"

import type { FooterConfig } from "@/lib/types"
import Link from "next/link"

export function Footer({ config, websiteId }: { config: FooterConfig; websiteId?: string }) {
  return (
    <footer className="border-border border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{config.companyName}</h3>
            {config.description && <p className="text-muted-foreground text-sm">{config.description}</p>}
          </div>

          {config.showLinks && config.links && config.links.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {config.links.map((link, index) => (
                  <Link
                    key={index}
                    href={`/render/${websiteId}/${link.pageId}`}
                    className="text-muted-foreground transition-colors hover:text-foreground text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-border mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
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
