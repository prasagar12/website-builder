"use client"

import { useEffect, useState } from "react"
import { StorageManager } from "@/lib/storage"
import { LayoutManager, layoutTemplates } from "@/lib/layout-manager"
import type { Website } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ExternalLink, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadWebsites()
  }, [])

  const loadWebsites = () => {
    const loadedWebsites = StorageManager.getWebsites()
    if (loadedWebsites.length === 0) {
      // Create a default website if none exist
      const defaultWebsite: Website = {
        id: "default-website",
        name: "My First Website",
        domain: undefined, // Add domain
        dns: undefined, // Add DNS
        colors: {
          primary: "#0f172a",
          secondary: "#f8fafc",
          accent: "#10b981",
        }, // Add colors
        pages: [
          {
            id: "default-page",
            name: "Home",
            path: "/",
            layout: layoutTemplates.landing as any,
          },
        ],
      }
      StorageManager.saveWebsite(defaultWebsite)
      setWebsites([defaultWebsite])
    } else {
      setWebsites(loadedWebsites)
    }
  }
  const handleCreateWebsite = () => {
    // Creation now happens on /create page
    window.location.href = "/create"
  }
  const handleDeleteWebsite = (websiteId: string) => {
    if (confirm("Are you sure you want to delete this website?")) {
      StorageManager.deleteWebsite(websiteId)
      loadWebsites()
      toast({
        title: "Website deleted",
        description: "The website has been deleted.",
      })
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-border bg-background border-b">
        <div className="container  mx-auto flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-bold">No-Code Website Builder</h1>
            <p className="text-muted-foreground text-sm">Create and manage your websites</p>
          </div>

          <Button  className=" cursor-pointer" onClick={handleCreateWebsite}>
            <Plus className="mr-2 h-4 w-4" />
            New Website
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Your Websites</h2>
          <p className="text-muted-foreground text-sm">Manage and edit your website projects</p>
        </div>

        {websites.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4 text-center">
                No websites yet. Create your first one to get started!
              </p>
              <Button onClick={handleCreateWebsite}>
                <Plus className="mr-2 h-4 w-4" />
                Create Website
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {websites.map((website) => (
              <Card key={website.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{website.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWebsite(website.id)}
                      className="text-destructive cursor-pointer shrink-0"
                    >
                      <Trash2 className="h-4 w-4 " />
                    </Button>
                  </CardTitle>
                  <CardDescription>{website.pages.length} page(s)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    {/* <p className="text-muted-foreground text-sm font-medium">Pages:</p> */}
                    <div className="space-y-1">
                      {website.pages.map((page) => (
                        <div key={page.id} className="flex items-center gap-2 text-sm">
                          <FileText className="text-muted-foreground h-3 w-3" />
                          <span>{page.name}</span>
                          <span className="text-muted-foreground">({page.layout.length} components)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/builder?website=${website.id}&page=${website.pages[0]?.id}`}>Edit Website</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href={`/dashboard/${website.id}`}>Add Page</Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    {/* <Link href={`/dashboard/${website.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link> */}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
