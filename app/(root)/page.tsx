import SearchForm from "../../components/SearchForm";
import StartupCard, {StartupTypeCard} from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


// Home component that handles search parameters
export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>; // Corrected type for searchParams
}) {
  const query = (await searchParams).query;

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY});
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} /> {/* Removed unnecessary spaces */}
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

      <SanityLive/>
    </>
  );
}
