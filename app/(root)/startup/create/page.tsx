import { authOptions } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"
import React from "react"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

const page = async () => {
  const session = await authOptions

  if (!session) redirect("/")
  return (
    <>
      <section className="hero_container !min-h-[230px] relative">
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={4}
          gridGap={18}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="relative z-10">
          <h1 className="heading">Submit Your Startup</h1>
        </div>
      </section>
      <StartupForm />
    </>
  )
}

export default page
