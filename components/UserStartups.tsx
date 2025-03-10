import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import React from "react"
import StartupCard, { StartupTypeCard } from "./StartupCard"

const UserStartups = async ({ id }: { id: string }) => {
  // Always fetch fresh data with useCdn: false
  const startups = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

  // Render StartupCard components if startups exist
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No startups found.</p> // Provide feedback if no startups are available
      )}
    </>
  )
}

export default UserStartups
