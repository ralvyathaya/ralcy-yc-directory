import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import SearchForm from "../../components/SearchForm"
import StartupCard, { StartupTypeCard } from "../../components/StartupCard"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"
import { SanityLive } from "@/sanity/lib/live"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { client } from "@/sanity/lib/client"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await getServerSession(authOptions)
  console.log(session?.user?.id) // Access Sanity user ID

  // Use non-cached client to ensure fresh data
  const posts = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_QUERY, params)

  return (
    <>
      <section className="hero_container relative">
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={4}
          gridGap={18}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="heading text-center">
            Share Your Vision, <br /> Collaborate with Innovators💡
          </h1>
          <p className="sub-heading text-center !max-w-3xl">
            Share your ideas, cast your votes on pitches, and shine in our
            virtual competitions!
          </p>
          <SearchForm query={query} />
        </div>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
