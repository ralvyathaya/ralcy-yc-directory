import SearchForm from "../../components/SearchForm";

// Home component that handles search parameters
export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>; // Corrected type for searchParams
}) { 
  const query  = (await searchParams).query; // Destructured query for clarity
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
    </>
  );
}
