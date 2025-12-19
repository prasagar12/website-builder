import { NextResponse } from "next/server"
import { mockApiResponses } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: Promise<{ component: string }> }) {
  const { component } = await params
  const { searchParams } = new URL(request.url)
  const websiteId = searchParams.get("websiteId")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Get mock data based on component type
  const endpoint = `/api/${component}`
  const data = mockApiResponses[endpoint]

  if (!data) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 })
  }

  // In production, you would filter by websiteId here
  // For now, return mock data
  return NextResponse.json(data)
}
