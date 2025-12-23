"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StorageManager } from "@/lib/storage";
import { LayoutManager, layoutTemplates } from "@/lib/layout-manager";
import type { Website } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Arrow } from "@radix-ui/react-select";
import { ArrowLeft } from "lucide-react";

export default function CreateWebsitePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [dns, setDns] = useState("");

  const [colors, setColors] = useState({
    primary: "#0f172a",
    secondary: "#f8fafc",
    accent: "#10b981",
  })

  const downloadDNSFile = () => {
    const csvContent = [
      ["Type", "Host", "Value", "TTL"],
      ["A", "@", "192.168.1.1", "3600"],
      ["AAAA", "@", "2404:6800:4009:80b::200e", "3600"],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "dns-records.csv"
    link.click()

    URL.revokeObjectURL(url)
  }


  const [fontFamily, setFontFamily] = useState("Inter, system-ui, sans-serif");

  const handleCreate = () => {
    if (!name.trim()) {
      toast({
        title: "Website name required",
        description: "Please enter a reference name for your website.",
        variant: "destructive",
      });
      return;
    }

    const websiteId = LayoutManager.generateId();
    const homePageId = LayoutManager.generateId();



    const newWebsite: Website = {
      id: websiteId,
      name,
      domain: domain || undefined,
      dns: dns || undefined,
      colors,
      fonts: {
        heading: fontFamily,
      },

      pages: [
        {
          id: homePageId,
          name: "Home",
          path: "/",
          layout: layoutTemplates.landing as any,
        },
      ],
    };

    StorageManager.saveWebsite(newWebsite);

    toast({
      title: "Website created",
      description: "Your themed website has been created. Opening builder…",
    });

    router.push(`/builder?website=${websiteId}&page=${homePageId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background">
        <div className="container p-2 mx-auto flex  items-center justify-between px-4">

          <Button
            variant="outline"
            className="text-xs cursor-pointer"
            onClick={() => router.push("/")}
          >

            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
          {/* Sidebar settings */}
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">Website Theme</CardTitle>
              <CardDescription className="text-xs">
                Set name, domain and theme. Preview updates live on the right.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Basics
                </p>
                <div className="space-y-2">
                  <Label htmlFor="name">Website Name *</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Website"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>

                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />

                  {/* Instructions */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Point your domain to the DNS records.{" "}
                    <button
                      type="button"
                      onClick={downloadDNSFile}
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      Download DNS records
                    </button>
                    . If you don’t have a domain,{" "}
                    <a
                      href="mailto:info@rapidlinks.org.in"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      contact us
                    </a>
                    .
                  </p>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="dns">DNS Settings</Label>
                  <Input
                    id="dns"
                    placeholder="ns1.example.com"
                    value={dns}
                    onChange={(e) => setDns(e.target.value)}
                  />
                </div> */}
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Theme Colors
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="primary" className="text-xs">
                      Primary
                    </Label>
                    <Input
                      id="primary"
                      type="color"
                      value={colors.primary}
                      onChange={(e) =>
                        setColors({ ...colors, primary: e.target.value })
                      }
                      className="h-10 w-full cursor-pointer"
                    />
                  </div>
                  {/* <div className="space-y-1">
                    <Label htmlFor="secondary" className="text-xs">
                      Secondary
                    </Label>
                    <Input
                      id="secondary"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) =>
                        setColors({ ...colors, secondary: e.target.value })
                      }
                      className="h-10 w-full cursor-pointer"
                    />
                  </div> */}
                  <div className="space-y-1">
                    <Label htmlFor="accent" className="text-xs">
                      Accent
                    </Label>
                    <Input
                      id="accent"
                      type="color"
                      value={colors.accent}
                      onChange={(e) =>
                        setColors({ ...colors, accent: e.target.value })
                      }
                      className="h-10 w-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Typography
                </p>
                <div className="space-y-2">
                  <Label htmlFor="font">Font</Label>
                  <select
                    id="font"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Inter, system-ui, sans-serif">Inter</option>
                    <option value="Poppins, system-ui, sans-serif">
                      Poppins
                    </option>
                    <option value="Montserrat, system-ui, sans-serif">
                      Montserrat
                    </option>
                    <option value="Space Grotesk, system-ui, sans-serif">
                      Space Grotesk
                    </option>
                    <option value="Roboto, system-ui, sans-serif">
                      Roboto
                    </option>
                    <option value="Georgia, serif">Georgia (Serif)</option>
                  </select>
                </div>
              </div>

              <Button className="w-full" onClick={handleCreate}>
                Create &amp; Open Builder
              </Button>
            </CardContent>
          </Card>

          {/* Right: static preview site */}

          {/* Right: Full Website Live Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Live Website Preview
                </CardTitle>
                <CardDescription className="text-xs">
                  Full production-grade website preview. Updates live with your
                  theme.
                </CardDescription>
              </CardHeader>


              <CardContent>
                <div
                  className="rounded-xl overflow-hidden border shadow-lg"
                  style={{
                    fontFamily,
                    backgroundColor: colors.secondary,
                    color: colors.primary,
                  }}
                >
                  {/* ================= NAVBAR ================= */}
                  <header
                    className="flex items-center justify-between px-8 py-4"
                    style={{
                      backgroundColor: colors.primary,
                      color: "#ffffff",
                    }}
                  >
                    <span className="text-sm font-bold tracking-wide">
                      {name || "My Website"}
                    </span>

                    <nav className="hidden md:flex gap-6 text-xs opacity-90">
                      <span>Home</span>
                      <span>Services</span>
                      <span>About</span>
                      <span>Contact</span>
                    </nav>
                  </header>

                  {/* ================= HERO ================= */}
                  <section className="px-10 py-20 space-y-6">
                    <p className="text-[11px] uppercase tracking-[0.35em] opacity-70">
                      Modern Website Platform
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
                      {name || "Build high-quality websites without engineering effort"}
                    </h1>

                    <p className="text-sm opacity-80 max-w-xl">
                      {domain
                        ? `Live on ${domain}. Fully customizable, scalable and fast.`
                        : "Design, customize and launch your website using a powerful no-code builder."}
                    </p>

                    <div className="pt-4">
                      <Button
                        style={{
                          backgroundColor: colors.accent,
                          color: "#ffffff",
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </section>

                  {/* ================= SERVICES ================= */}
                  <section
                    className="px-10 py-16"
                    style={{ backgroundColor: `${colors.primary}08` }}
                  >
                    <h2 className="text-2xl font-semibold mb-10 text-center">
                      Our Services
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3 text-sm">
                      {[
                        "Website Design",
                        "Landing Pages",
                        "SEO Optimization",
                        "E-commerce Setup",
                        "Branding",
                        "Maintenance",
                      ].map((service) => (
                        <div
                          key={service}
                          className="rounded-xl p-6 transition"
                          style={{
                            backgroundColor: "#ffffff",
                            border: `1px solid ${colors.primary}15`,
                          }}
                        >
                          <p className="font-semibold mb-2">{service}</p>
                          <p className="opacity-75 text-xs">
                            Professionally designed sections optimized for performance.
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* ================= STATS ================= */}
                  <section className="px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                      ["10K+", "Websites Built"],
                      ["99.9%", "Uptime"],
                      ["5x", "Faster Launch"],
                      ["24/7", "Support"],
                    ].map(([value, label]) => (
                      <div key={label}>
                        <p className="text-3xl font-bold">{value}</p>
                        <p className="text-xs opacity-70">{label}</p>
                      </div>
                    ))}
                  </section>

                  {/* ================= CONTACT ================= */}
                  <section
                    className="px-10 py-20"
                    style={{ backgroundColor: `${colors.primary}05` }}
                  >
                    <h2 className="text-2xl font-semibold mb-12 text-center">
                      Contact Us
                    </h2>

                    <div className="max-w-3xl mx-auto grid gap-10 md:grid-cols-2 items-center">
                      <div className="grid gap-4 text-sm">
                        <Input placeholder="Your name" />
                        <Input placeholder="Email address" />
                        <Input placeholder="Subject" />
                        <textarea
                          className="w-full rounded-lg border px-3 py-2"
                          rows={3}
                          placeholder="Message"
                        />
                        <Button
                          className="w-fit"
                          style={{
                            backgroundColor: colors.accent,
                            color: "#ffffff",
                          }}
                        >
                          Send Message
                        </Button>
                      </div>

                      <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                          alt="Contact"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </section>

                  {/* ================= FOOTER ================= */}
                  <footer
                    className="px-8 py-5 flex items-center justify-between text-[11px]"
                    style={{
                      backgroundColor: colors.primary,
                      color: "#ffffff",
                    }}
                  >
                    <span>
                      © {new Date().getFullYear()} {name || "My Website"}
                    </span>
                    <span className="opacity-80">Built with No-Code Platform</span>
                  </footer>
                </div>
              </CardContent>



            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
