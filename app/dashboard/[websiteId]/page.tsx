"use client"

import { use, useEffect, useState } from "react"
import { StorageManager } from "@/lib/storage"
import { LayoutManager, layoutTemplates } from "@/lib/layout-manager"
import type { Website, Page } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, ExternalLink, Trash2, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { PageRenderer } from "@/components/page-renderer"

export default function WebsiteDashboard({ params }: { params: Promise<{ websiteId: string }> }) {
  const { websiteId } = use(params)
  const [website, setWebsite] = useState<Website | null>(null)
  const [newPageName, setNewPageName] = useState("")
  const [newPagePath, setNewPagePath] = useState("/")
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof layoutTemplates>("landing")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadWebsite()
  }, [websiteId])

  const loadWebsite = () => {
    const loadedWebsite = StorageManager.getWebsite(websiteId)
    setWebsite(loadedWebsite)
  }

  const handleCreatePage = () => {
    if (!newPageName.trim() || !website) return

    const newPage: Page = {
      id: LayoutManager.generateId(),
      name: newPageName,
      path: newPagePath || "/",
      layout: layoutTemplates[selectedTemplate] as any,
    }

    website.pages.push(newPage)
    StorageManager.saveWebsite(website)
    loadWebsite()
    setNewPageName("")
    setNewPagePath("/")
    setIsDialogOpen(false)

    toast({
      title: "Page created",
      description: `${newPageName} has been created successfully.`,
    })
  }

  const handleDeletePage = (pageId: string) => {
    if (!website) return

    if (website.pages.length === 1) {
      toast({
        title: "Cannot delete",
        description: "A website must have at least one page.",
        variant: "destructive",
      })
      return
    }

    if (confirm("Are you sure you want to delete this page?")) {
      website.pages = website.pages.filter((p) => p.id !== pageId)
      StorageManager.saveWebsite(website)
      loadWebsite()

      toast({
        title: "Page deleted",
        description: "The page has been deleted.",
      })
    }
  }

  if (!website) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Website not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="border-border bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Websites
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">{website.name}</h1>
              <p className="text-muted-foreground text-sm">Manage pages and settings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/render/${websiteId}/${website.pages[0]?.id}`} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview Website
              </Link>
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Page
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Page</DialogTitle>
                  <DialogDescription>Add a new page to your website</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="pageName">Page Name</Label>
                    <Input
                      id="pageName"
                      placeholder="About Us"
                      value={newPageName}
                      onChange={(e) => setNewPageName(e.target.value)}
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="pagePath">Path</Label>
                    <Input
                      id="pagePath"
                      placeholder="/about"
                      value={newPagePath}
                      onChange={(e) => setNewPagePath(e.target.value)}
                    />
                  </div> */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={(v) => setSelectedTemplate(v as any)}>
                      <SelectTrigger id="template">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="about">About Page</SelectItem>
                        <SelectItem value="services">Services Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePage} disabled={!newPageName.trim()}>
                    Create Page
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Pages</h2>
          <p className="text-muted-foreground text-sm">Manage the pages in your website</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {website.pages.map((page) => (
            // <Card key={page.id}>
            //   <CardHeader>
            //     <CardTitle className="flex items-center justify-between">
            //       <span className="truncate">{page.name}</span>
            //       <Button
            //         variant="ghost"
            //         size="icon"
            //         onClick={() => handleDeletePage(page.id)}
            //         className="text-destructive shrink-0"
            //         disabled={website.pages.length === 1}
            //       >
            //         <Trash2 className="h-4 w-4" />
            //       </Button>
            //     </CardTitle>
            //     {/* <CardDescription>{page.path}</CardDescription> */}
            //   </CardHeader>
            //   <CardContent>
            //     <p className="text-muted-foreground text-sm">{page.layout.length} components</p>
            //   </CardContent>
            //   <CardFooter className="flex gap-2">
            //     <Button asChild className="flex-1">
            //       <Link href={`/builder?website=${websiteId}&page=${page.id}`}>
            //         <Edit className="mr-2 h-4 w-4" />
            //         Edit
            //       </Link>
            //     </Button>
            //     <Button asChild variant="outline" size="icon">
            //       <Link href={`/render/${websiteId}/${page.id}`} target="_blank">
            //         <ExternalLink className="h-4 w-4" />
            //       </Link>
            //     </Button>
            //   </CardFooter>
            // </Card>
            <Card key={page.id} className="flex flex-col">
              <CardHeader className="space-y-3">
                {/* TITLE + DELETE */}
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{page.name}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePage(page.id)}
                    className="text-destructive shrink-0"
                    disabled={website.pages.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>

                {/*  INLINE PAGE PREVIEW */}
                <div className="relative h-40 overflow-hidden rounded-md border bg-background">
                  <div
                    className="origin-top-left scale-[0.35]"
                    style={{
                      width: "300%",
                      pointerEvents: "none",
                    }}
                  >
                    <PageRenderer
                      layout={page.layout}
                      websiteId={websiteId}
                      website={website}
                      isPreview
                    />
                  </div>

                  <div className="absolute inset-0 rounded-md ring-1 ring-border" />
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <p className="text-muted-foreground text-sm">
                  {page.layout.length} components
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/builder?website=${websiteId}&page=${page.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>

                <Button asChild size="sm" variant="outline">
                  <Link href={`/render/${websiteId}/${page.id}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </Button>
              </CardFooter>
            </Card>

          ))}
        </div>
      </div>
    </div>
  )
}
