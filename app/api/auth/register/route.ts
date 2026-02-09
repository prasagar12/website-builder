import { NextResponse } from "next/server"
import { createUser } from "@/lib/auth-users"
import { registerSchema } from "@/lib/auth-schemas"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors
      const message =
        first.email?.[0] ?? first.password?.[0] ?? first.name?.[0] ?? "Invalid input"
      return NextResponse.json({ error: message }, { status: 400 })
    }
    const { email, name, password } = parsed.data
    const result = await createUser({ email, name, password })
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 409 })
    }
    return NextResponse.json({
      user: { id: result.id, email: result.email, name: result.name },
    })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
