"use client"

import Image from "next/image"
import { useState } from "react"
import type { Website } from "@/lib/types"

interface ContactFormProps {
  config: {
    title?: string
    description?: string
    imageUrl?: string
    layout?: string // 👈 IMPORTANT
  }
  website: Website
}

const ContactForm = ({ config, website }: ContactFormProps) => {
  const theme = website?.colors || {
    primary: "#000000",
    secondary: "#f8fafc",
    accent: "#10b981",
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    file: null as File | null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    alert("Form submitted successfully!")
  }

  /* ------------------------------------------------
     SHARED FORM UI (reuse for both variants)
  ------------------------------------------------ */
  const FormUI = (
    <div
      className="flex flex-col justify-center rounded-2xl p-8"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: `0 18px 40px -15px ${theme.accent}40`,
      }}
    >
      <h2
        className="mb-2 text-3xl font-bold"
        style={{ color: theme.primary, fontFamily: font.heading }}
      >
        {config.title || "Contact Us"}
      </h2>

      <p
        className="mb-8 max-w-md"
        style={{ color: theme.primary, opacity: 0.7 }}
      >
        {config.description || "We would love to hear from you"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", type: "text", placeholder: "Full Name", required: true },
          { name: "email", type: "email", placeholder: "Email Address", required: true },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
          { name: "subject", type: "text", placeholder: "Subject" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 outline-none transition"
            style={{ borderColor: `${theme.primary}20` }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.accent}`)
            }
            onBlur={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          />
        ))}

        <textarea
          name="message"
          rows={4}
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 outline-none transition"
          style={{ borderColor: `${theme.primary}20` }}
        />

        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm"
          style={{ color: theme.primary }}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg py-3 font-medium transition"
          style={{
            backgroundColor: theme.accent,
            color: "#ffffff",
            boxShadow: `0 10px 24px -12px ${theme.accent}`,
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  )

  /* ------------------------------------------------
     VARIANT 2 – Centered Form
  ------------------------------------------------ */
  if (config.layout === "variant-2") {
    return (
      <section
        className="py-20"
        style={{ backgroundColor: theme.secondary }}
      >
        <div className="container mx-auto px-4 max-w-xl">
          {FormUI}
        </div>
      </section>
    )
  }

  /* ------------------------------------------------
     VARIANT 1 – Image + Form (default)
  ------------------------------------------------ */
  return (
    <section
      className="py-16"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="container mx-auto px-4">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="relative overflow-hidden rounded-2xl">
            {config.imageUrl ? (
              <Image
                src={config.imageUrl}
                alt="Contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className="flex h-full items-center justify-center text-sm"
                style={{ color: theme.primary, opacity: 0.5 }}
              >
                Contact Image
              </div>
            )}
          </div>

          {/* RIGHT FORM */}
          {FormUI}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
