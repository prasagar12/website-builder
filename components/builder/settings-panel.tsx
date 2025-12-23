"use client"

import type { LayoutBlock, Page } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, X } from "lucide-react"

interface SettingsPanelProps {
  block: LayoutBlock | null
  onUpdate: (blockId: string, config: Partial<LayoutBlock["config"]>) => void
  onDelete: (blockId: string) => void
  pages?: Page[] // Added pages prop for link selection
  websiteId?: string // Added websiteId prop
}

export function SettingsPanel({ block, onUpdate, onDelete, pages = [], websiteId }: SettingsPanelProps) {
  if (!block) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p className="text-muted-foreground text-center text-sm">Select a component to edit its settings</p>
      </div>
    )
  }


  const handleChange = (key: string, value: any) => {
    onUpdate(block.config.id, { [key]: value })
  }

  const handleAddLink = () => {
    const links = (block.config as any).links || []
    handleChange("links", [...links, { label: "New Link", pageId: pages[0]?.id || "" }])
  }

  const handleUpdateLink = (index: number, field: "label" | "pageId", value: string) => {
    const links = [...((block.config as any).links || [])]
    links[index] = { ...links[index], [field]: value }
    handleChange("links", links)
  }

  const handleRemoveLink = (index: number) => {
    const links = [...((block.config as any).links || [])]
    links.splice(index, 1)
    handleChange("links", links)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-border bg-background sticky top-0 z-10 border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-muted-foreground text-sm">{block.type.replace("_", " ")}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(block.config.id)} className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        <div className="space-y-2">
          <Label htmlFor="layout">Layout Style</Label>
          <Select
            value={(block.config as any).layout || "variant-1"}
            onValueChange={(value) => handleChange("layout", value)}
          >
            <SelectTrigger id="layout">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="variant-1">Style 1</SelectItem>
              <SelectItem value="variant-2">Style 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* navbar */}
        {block.type === "NAVBAR" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Image URL</Label>
              <Input
                id="logo"
                placeholder="https://example.com/logo.png"
                value={(block.config as any).logo || ""}
                onChange={(e) => handleChange("logo", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Navigation Links</Label>
                <Button size="sm" variant="outline" onClick={handleAddLink}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Link
                </Button>
              </div>
              <div className="space-y-2">
                {((block.config as any).links || []).map((link: any, index: number) => (
                  <div key={index} className="border-border rounded-lg border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Link {index + 1}</Label>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleRemoveLink(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) => handleUpdateLink(index, "label", e.target.value)}
                    />
                    <Select value={link.pageId} onValueChange={(value) => handleUpdateLink(index, "pageId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map((page) => (
                          <SelectItem key={page.id} value={page.id}>
                            {page.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* hero */}

        {block.type === "HERO" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="image">Hero Image URL</Label>
              <Input
                id="image"
                placeholder="https://example.com/hero.jpg"
                value={(block.config as any).image || ""}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={(block.config as any).subtitle || ""}
                onChange={(e) => handleChange("subtitle", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showButton">Show Button</Label>
              <Switch
                id="showButton"
                checked={(block.config as any).showButton || false}
                onCheckedChange={(checked) => handleChange("showButton", checked)}
              />
            </div>
            {(block.config as any).showButton && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={(block.config as any).buttonText || ""}
                    onChange={(e) => handleChange("buttonText", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLinkType">Link Type</Label>
                  <Select
                    value={(block.config as any).buttonLinkType || "page"}
                    onValueChange={(value) => handleChange("buttonLinkType", value)}
                  >
                    <SelectTrigger id="buttonLinkType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page Link</SelectItem>
                      <SelectItem value="external">External URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(block.config as any).buttonLinkType === "page" ? (
                  <div className="space-y-2">
                    <Label htmlFor="buttonLink">Link to Page</Label>
                    <Select
                      value={(block.config as any).buttonLink || ""}
                      onValueChange={(value) => handleChange("buttonLink", value)}
                    >
                      <SelectTrigger id="buttonLink">
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map((page) => (
                          <SelectItem key={page.id} value={page.id}>
                            {page.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="buttonLink">External URL</Label>
                    <Input
                      id="buttonLink"
                      placeholder="https://example.com"
                      value={(block.config as any).buttonLink || ""}
                      onChange={(e) => handleChange("buttonLink", e.target.value)}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
        {/* text section */}
        {block.type === "TEXT_SECTION" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={(block.config as any).heading || ""}
                onChange={(e) => handleChange("heading", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={6}
                value={(block.config as any).content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alignment">Alignment</Label>
              <Select
                value={(block.config as any).alignment || "left"}
                onValueChange={(value) => handleChange("alignment", value)}
              >
                <SelectTrigger id="alignment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* service grid */}
        {block.type === "SERVICE_GRID" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="limit">Number of Services</Label>
              <Input
                id="limit"
                type="number"
                min="1"
                max="12"
                value={(block.config as any).limit || 6}
                onChange={(e) => handleChange("limit", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Select
                value={String((block.config as any).columns || 3)}
                onValueChange={(value) => handleChange("columns", Number.parseInt(value))}
              >
               
                <SelectTrigger id="columns">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        {/* product list */}

        {block.type === "PRODUCT_LIST" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="limit">Number of Products</Label>
              <Input
                id="limit"
                type="number"
                min="1"
                max="12"
                value={(block.config as any).limit || 6}
                onChange={(e) => handleChange("limit", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showPrice">Show Prices</Label>
              <Switch
                id="showPrice"
                checked={(block.config as any).showPrice !== false}
                onCheckedChange={(checked) => handleChange("showPrice", checked)}
              />
            </div>
          </>
        )}

        {/* testimonials */}
        {block.type === "TESTIMONIALS" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="limit">Number of Testimonials</Label>
              <Input
                id="limit"
                type="number"
                min="1"
                max="12"
                value={(block.config as any).limit || 3}
                onChange={(e) => handleChange("limit", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay">Autoplay</Label>
              <Switch
                id="autoplay"
                checked={(block.config as any).autoplay || false}
                onCheckedChange={(checked) => handleChange("autoplay", checked)}
              />
            </div>
          </>
        )}

        {/* stats */}
        {block.type === "STATS" && (
          <div className="flex items-center justify-between">
            <Label htmlFor="showIcons">Show Icons</Label>
            <Switch
              id="showIcons"
              checked={(block.config as any).showIcons !== false}
              onCheckedChange={(checked) => handleChange("showIcons", checked)}
            />
          </div>
        )}

        {/* contact form */}
        {block.type === "CONTACT_FORM" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={(block.config as any).title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={(block.config as any).description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/contact.jpg"
                value={(block.config as any).imageUrl || ""}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
              />
            </div>
          </>
        )}

        {/* cta */}
        {block.type === "CTA" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={(block.config as any).title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={(block.config as any).description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={(block.config as any).buttonText || ""}
                onChange={(e) => handleChange("buttonText", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonLinkType">Link Type</Label>
              <Select
                value={(block.config as any).buttonLinkType || "page"}
                onValueChange={(value) => handleChange("buttonLinkType", value)}
              >
                <SelectTrigger id="buttonLinkType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="page">Page Link</SelectItem>
                  <SelectItem value="external">External URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(block.config as any).buttonLinkType === "page" ? (
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Link to Page</Label>
                <Select
                  value={(block.config as any).buttonLink || ""}
                  onValueChange={(value) => handleChange("buttonLink", value)}
                >
                  <SelectTrigger id="buttonLink">
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="buttonLink">External URL</Label>
                <Input
                  id="buttonLink"
                  placeholder="https://example.com"
                  value={(block.config as any).buttonLink || ""}
                  onChange={(e) => handleChange("buttonLink", e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="variant">Style</Label>
              <Select
                value={(block.config as any).variant || "default"}
                onValueChange={(value) => handleChange("variant", value)}
              >
                <SelectTrigger id="variant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="accent">Accent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* footer */}
        {block.type === "FOOTER" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={(block.config as any).companyName || ""}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={(block.config as any).description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showLinks">Show Links</Label>
              <Switch
                id="showLinks"
                checked={(block.config as any).showLinks || false}
                onCheckedChange={(checked) => handleChange("showLinks", checked)}
              />
            </div>
            {(block.config as any).showLinks && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Footer Links</Label>
                  <Button size="sm" variant="outline" onClick={handleAddLink}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Link
                  </Button>
                </div>
                <div className="space-y-2">
                  {((block.config as any).links || []).map((link: any, index: number) => (
                    <div key={index} className="border-border rounded-lg border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Link {index + 1}</Label>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleRemoveLink(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => handleUpdateLink(index, "label", e.target.value)}
                      />
                      <Select value={link.pageId} onValueChange={(value) => handleUpdateLink(index, "pageId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                          {pages.map((page) => (
                            <SelectItem key={page.id} value={page.id}>
                              {page.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
