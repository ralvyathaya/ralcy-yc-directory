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
    <header className="px-3 py-2 md:px-5 md:py-3 bg-white font-work-sans shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-3 md:gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="hover:underline">Create</span>
              </Link>
              <LogoutButton />
              <Link
                href={`/user/${session?.user.id}`}
                className="flex items-center gap-2"
              >
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name || ""}
                  />
                </Avatar>
                <span className="hidden md:inline text-sm md:text-base truncate">
                  {session?.user?.name}
                </span>
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
