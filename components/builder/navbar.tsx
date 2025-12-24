// "use client"

// import type { NavbarConfig } from "@/lib/types"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"
// import { useState } from "react"
// import Image from "next/image"

// export function Navbar({
//   config,
//   websiteId,
//   website,
// }: {
//   config: NavbarConfig
//   websiteId?: string
//   website: any
// }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   //THEME (safe fallback for editor & preview)
//   const theme = website?.colors
//   // console.log(theme)
//    const font = website?.fonts || {
//     heading: "Inter, system-ui, sans-serif",
//   }
//   return (
//     <nav
//       style={{
//         backgroundColor: theme.primary,
//         color: theme.primary,
//         fontFamily: font.heading,
//       }}
//       className="sticky top-0 z-50 border-b border-black/10"
//     >
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* LOGO / BRAND */}
//         {config.logo ? (
//           <Image
//             width={48}
//             height={48}
//             src={config.logo}
//             alt={config.brandName || "Logo"}
//           />
//         ) : (
//           <span
//             className="text-xl font-bold tracking-wide"
//             style={{ color: theme.secondary }}
//           >
//             {config.brandName}
//           </span>
//         )}

//         {/* DESKTOP NAV */}
//         <div className="hidden items-center gap-6 md:flex">
//           {config.links?.map((link, index) => (
//             <Link
//               key={index}
//               href={`/render/${websiteId}/${link.pageId}`}
//               className="text-sm font-medium transition-colors"
//               style={{ color: theme.secondary }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.color = theme.accent)
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.color = theme.secondary)
//               }
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* MOBILE TOGGLE (ACTION COLOR) */}
//         <Button
//           size="icon"
//           className="md:hidden"
//           style={{
//             backgroundColor: theme.accent,
//             color: "#ffffff",
//           }}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <Menu className="h-5 w-5" />
//         </Button>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenuOpen && (
//         <div
//           className="md:hidden"
//           style={{
//             backgroundColor: theme.secondary,
//             borderTop: `1px solid ${theme.primary}20`,
//           }}
//         >
//           <div className="container flex flex-col gap-2 p-4">
//             {config.links?.map((link, index) => (
//               <Link
//                 key={index}
//                 href={`/render/${websiteId}/${link.pageId}`}
//                 className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
//                 style={{ color: theme.secondary }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = theme.accent)
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "transparent")
//                 }
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.label}

//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
// Navbar.craft = {
//   displayName: "Navigation Bar",
//   props: {
//     config: {
//       brandName: "My Website",
//       links: [
//         { label: "Home", pageId: "home" },
//         { label: "About", pageId: "about" },
//       ],
//     },
//   },
//   related: {
//     settings: "NavbarSettings",
//   },
// }


"use client"

import type { NavbarConfig } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { NavbarSearch } from "../comman/navbar-search"

export function Navbar({
  config,
  websiteId,
  website,
}: {
  config: NavbarConfig
  websiteId?: string
  website: any
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const theme = website?.colors || {
    primary: "#000",
    secondary: "#fff",
    accent: "#10b981",
  }

  const font = website?.fonts || {
    heading: "Inter, system-ui, sans-serif",
  }

  /* ===================================================== */
  /* VARIANT 2 – Modern / CTA Navbar */
  /* ===================================================== */
  if (config.layout === "variant-2") {
    return (
      <nav
        className="sticky    max-w-7xl mx-auto   rounded-full top-0 mt-1 z-50 border-b"
        style={{
          backgroundColor: theme.primary,
          fontFamily: font.heading,
        }}
      >
        <div className="container mx-auto flex h-18 items-center justify-between px-4">
          {/* LEFT – LOGO */}
          <div className="flex items-center gap-2">
            {config.logo ? (
              <Image src={config.logo} width={44} height={44} alt="Logo" className="rounded-full" />
            ) : (
              <span
                className="text-xl font-bold"
                style={{ color: theme.primary }}
              >
                {config.brandName || "Brand Name"}
              </span>
            )}
          </div>

          {/* CENTER – LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {config.links?.map((link, i) => (
              <Link
                key={i}
                href={`/render/${websiteId}/${link.pageId}`}
                className="relative text-sm font-medium transition hover:opacity-80"
                style={{ color: theme.primary }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"
                  style={{ backgroundColor: theme.accent }}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT – SEARCH + CTA */}
          <div className="hidden md:flex cursor-pointer items-center gap-4">
            <NavbarSearch theme={theme} />
            <Button
              style={{
                backgroundColor: theme.accent,
                color: "#fff",

              }}
            >
              Get Started
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <Button
            size="icon"
            className="md:hidden"
            style={{ backgroundColor: theme.accent }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 pb-4 pt-3 space-y-3">

            {/* MOBILE SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2"
              // style={{ ringColor: theme.accent }}
              />
            </div>

            {config.links?.map((link, i) => (
              <Link
                key={i}
                href={`/render/${websiteId}/${link.pageId}`}
                className="block py-2 text-sm font-medium"
                style={{ color: theme.primary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button
              className="w-full"
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>

    )
  }

  /* ===================================================== */
  /* VARIANT 1 – Simple / Default Navbar */
  /* ===================================================== */
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: theme.primary,
        fontFamily: font.heading,
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        {config.logo ? (
          <Image src={config.logo} width={44} height={44} alt="Logo" />
        ) : (
          <span className="text-xl font-bold" style={{ color: theme.secondary }}>
            {config.brandName}
          </span>
        )}

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {config.links?.map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="text-sm font-medium"
              style={{ color: theme.secondary }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE */}
        <Button
          size="icon"
          className="md:hidden"
          style={{ backgroundColor: theme.accent }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          {config.links?.map((link, i) => (
            <Link
              key={i}
              href={`/render/${websiteId}/${link.pageId}`}
              className="block py-2 text-sm"
              style={{ color: theme.secondary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
