"use client"

import Image from "next/image"
import { useState } from "react"

interface ContactFormProps {
  config: {
    title?: string
    description?: string
    imageUrl?: string
  }
}

const ContactForm = ({ config }: ContactFormProps) => {
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
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form Data:", formData)
    alert("Form submitted successfully!")

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      file: null,
    })
  }

  return (
    <section className="container mx-auto px-4 py-5">
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
  {/* LEFT IMAGE */}
  <div className="relative h-143 overflow-hidden rounded-2xl ">
    {config.imageUrl ? (
      <Image
        src={config.imageUrl}
        alt="Contact"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    ) : (
      <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
        Contact Image
      </div>
    )}
  </div>

  {/* RIGHT FORM */}
  <div className="flex h-[570px] flex-col justify-center rounded-2xl bg-white p-6 shadow-md">
    <h2 className="mb-2 text-3xl font-bold">
      {config.title || "Contact Us"}
    </h2>
    <p className="mb-6 text-muted-foreground">
      {config.description || "We would love to hear from you"}
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded-lg border px-3 py-2"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full rounded-lg border px-3 py-2"
      />

      <textarea
        name="message"
        rows={3}
        placeholder="Your Message"
        value={formData.message}            
        onChange={handleChange}
        className="w-full rounded-lg border px-3 py-2"
      />

      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="w-full text-sm"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800"
      >
        Send Message
      </button>
    </form>
  </div>
</div>

    </section>
  )
}

export default ContactForm
