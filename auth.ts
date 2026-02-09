import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import {
  getUserByEmail,
  verifyPassword,
} from "@/lib/auth-users"
import { signInSchema } from "@/lib/auth-schemas"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          const user = await getUserByEmail(email)
          if (!user) return null
          const valid = await verifyPassword(user, password)
          if (!valid) return null
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: null,
          }
        } catch (error) {
          if (error instanceof ZodError) return null
          throw error
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const path = new URL(request.url).pathname
      if (path === "/login" || path === "/register") return true
      return !!auth
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
})
