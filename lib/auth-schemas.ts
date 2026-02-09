import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
})

export const registerSchema = object({
  name: string().min(1, "Name is required").max(100, "Name is too long"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password must be at least 2 characters")
    .max(72, "Password must be less than 72 characters")
    
})
