import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import UserStartups from "@/components/UserStartups"
import { Suspense } from "react"
import { StartupCardSkeleton } from "@/components/StartupCard"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

export const experimental_ppr = true

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })

  if (!user) return notFound()

  return (
    <div className="relative min-h-screen">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={24}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="relative z-10">
        <section className="profile_container">
          <div className="profile_card">
            <div className="profile_title">
              <h3 className="text-24-black uppercase text-center line-clamp-1">
                {user.name}
              </h3>
            </div>

            <Image
              src={user.image}
              alt={user.name}
              width={220}
              height={220}
              className="profile_image"
            />
            <p className="text-30-extrabold mt-7 text-center !text-black">
              @{user?.username}
            </p>

            <p className="mt-1 text-center text-14-normal !text-gray-700">
              {user.bio || "No bio available"}
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
            <p className="text-30-bold">
              {session?.user?.id === id ? "Your" : "Their"} Startups
            </p>
            <ul className="card_grid-sm">
              <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
              </Suspense>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default page
