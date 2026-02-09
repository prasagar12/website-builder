import bcrypt from "bcryptjs"

export interface AuthUser {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: Date
}

// In-memory user store. For production, replace with a database (e.g. Prisma, Drizzle).
const users = new Map<string, AuthUser>()

const SALT_ROUNDS = 12

async function seedDefaultUser() {
  const demoEmail = process.env.DEMO_USER_EMAIL ?? "demo@example.com"
  const demoPassword = process.env.DEMO_USER_PASSWORD ?? "demo1234"
  if (users.has(demoEmail)) return
  const passwordHash = await bcrypt.hash(demoPassword, SALT_ROUNDS)
  users.set(demoEmail, {
    id: "demo-user",
    email: demoEmail,
    name: "Demo User",
    passwordHash,
    createdAt: new Date(),
  })
}

// Seed on first use
let seeded = false
async function ensureSeeded() {
  if (!seeded) {
    await seedDefaultUser()
    seeded = true
  }
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  await ensureSeeded()
  const normalized = email.toLowerCase().trim()
  return users.get(normalized) ?? null
}

export async function verifyPassword(user: AuthUser, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash)
}

export async function createUser(params: {
  email: string
  name: string
  password: string
}): Promise<AuthUser | { error: string }> {
  await ensureSeeded()
  const normalized = params.email.toLowerCase().trim()
  if (users.has(normalized)) {
    return { error: "An account with this email already exists." }
  }
  const passwordHash = await bcrypt.hash(params.password, SALT_ROUNDS)
  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const user: AuthUser = {
    id,
    email: normalized,
    name: params.name.trim() || params.email.split("@")[0],
    passwordHash,
    createdAt: new Date(),
  }
  users.set(normalized, user)
  return user
}
