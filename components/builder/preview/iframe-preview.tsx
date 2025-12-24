"use client"

import { useEffect, useRef } from "react"

interface IframePreviewProps {
  children: React.ReactNode
  width?: number
  height?: number
}

export function IframePreview({
  children,
  width = 150,
  height = 100,
}: IframePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument
    if (!doc) return

    doc.open()
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              font-family: system-ui;
              background: white;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `)
    doc.close()
  }, [])

  return (
    <div className="relative overflow-hidden rounded-md border bg-muted">
      <iframe
        ref={iframeRef}
        style={{
          width,
          height,
          transform: "scale(0.4)",
          transformOrigin: "top left",
        }}
      />
      <div
        style={{
          width,
          height,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  )
}
