import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/auth/session-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "The No-Code Website Builder",
  description: "Created with wedsite, the no-code website builder.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  )
}
