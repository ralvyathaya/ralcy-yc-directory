// app/components/Navbar.tsx
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { LoginButton, LogoutButton } from "./AuthButtons"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="px-5 py-3 bg-white font-work-sans shadow-sm">
      <nav className="flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        {/* Hamburger Menu Icon (Mobile Only) */}
        <label htmlFor="nav-toggle" className="md:hidden cursor-pointer">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {/* Hidden Checkbox for Toggle */}
        <input type="checkbox" id="nav-toggle" className="hidden peer" />

        {/* Navigation Items */}
        <div className="hidden peer-checked:flex flex-col absolute top-full left-0 w-full bg-white shadow-md md:flex md:flex-row md:static md:items-center md:gap-5 text-black p-5 md:p-0 z-10">
          {session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="py-2 md:py-0 hover:text-blue-500 transition-colors"
              >
                Create
              </Link>
              <LogoutButton />
              <Link
                href={`/user/${session?.user.id}`}
                className="flex items-center gap-2 py-2 md:py-0 hover:text-blue-500 transition-colors"
              >
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User avatar"}
                  />
                </Avatar>
                <span className="hidden md:block">{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
