"use client"

import { useEffect, useState } from "react"
import { StorageManager } from "@/lib/storage"
import { LayoutManager, layoutTemplates } from "@/lib/layout-manager"
import type { Website } from "@/lib/types"
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
import { Plus, ExternalLink, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [newWebsiteName, setNewWebsiteName] = useState("")
  const [newDomain, setNewDomain] = useState("") // Add domain state
  const [newDns, setNewDns] = useState("") // Add DNS state
  const [newColors, setNewColors] = useState({
    // Add color states
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#10b981",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
        colors: { primary: "#3b82f6", secondary: "#8b5cf6", accent: "#10b981" }, // Add colors
        pages: [
          {
            id: "default-page",
            name: "Home",
            path: "/",
            layout: layoutTemplates.landing,
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
    if (!newWebsiteName.trim()) return

    const newWebsite: Website = {
      id: LayoutManager.generateId(),
      name: newWebsiteName,
      domain: newDomain || undefined, // Add domain
      dns: newDns || undefined, // Add DNS
      colors: newColors, // Add colors
      pages: [
        {
          id: LayoutManager.generateId(),
          name: "Home",
          path: "/",
          layout: [],
        },
      ],
    }

    StorageManager.saveWebsite(newWebsite)
    loadWebsites()
    setNewWebsiteName("")
    setNewDomain("") // Reset domain
    setNewDns("") // Reset DNS
    setNewColors({ primary: "#3b82f6", secondary: "#8b5cf6", accent: "#10b981" }) // Reset colors
    setIsDialogOpen(false)

    toast({
      title: "Website created",
      description: `${newWebsiteName} has been created successfully.`,
    })
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Website
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              {" "}
              {/* Wider dialog */}
              <DialogHeader>
                <DialogTitle>Create New Website</DialogTitle>
                <DialogDescription>Configure your website settings</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Website Name *</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Website"
                    value={newWebsiteName}
                    onChange={(e) => setNewWebsiteName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dns">DNS Settings</Label>
                  <Input
                    id="dns"
                    placeholder="ns1.example.com"
                    value={newDns}
                    onChange={(e) => setNewDns(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="primary" className="text-xs">
                        Primary
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary"
                          type="color"
                          value={newColors.primary}
                          onChange={(e) => setNewColors({ ...newColors, primary: e.target.value })}
                          className="h-10 w-full cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="secondary" className="text-xs">
                        Secondary
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary"
                          type="color"
                          value={newColors.secondary}
                          onChange={(e) => setNewColors({ ...newColors, secondary: e.target.value })}
                          className="h-10 w-full cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="accent" className="text-xs">
                        Accent
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="accent"
                          type="color"
                          value={newColors.accent}
                          onChange={(e) => setNewColors({ ...newColors, accent: e.target.value })}
                          className="h-10 w-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWebsite} disabled={!newWebsiteName.trim()}>
                  Create Website
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              <Button onClick={() => setIsDialogOpen(true)}>
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
                      className="text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>{website.pages.length} page(s)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Pages:</p>
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
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/dashboard/${website.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
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
