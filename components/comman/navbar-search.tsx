import { Search } from "lucide-react";

export function NavbarSearch({ theme }: { theme: any }) {
  return (
    <div className="relative hidden md:flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <input
        type="search"
        placeholder="Search..."
        className="h-9 w-56 rounded-full border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-transparent focus:ring-2"
        style={{
          fontFamily: "inherit",
        //   ringColor: theme.accent,
        }}
      />
    </div>
  )
}
