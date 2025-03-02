import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { marked } from "marked"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import { StartupTypeCard } from "@/components/StartupCard"
import StartupCard from "@/components/StartupCard"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

export const experimental_ppr = true

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ])

  if (!post) return notFound()

  const parsedContent = await marked(post?.pitch || "")

  return (
    <>
      <section className="hero_container !min-h-[230px] relative">
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={4}
          gridGap={18}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.3}
        />
        <div className="relative z-10">
          <p className="tag !max-w-[200px] text-center mx-auto">
            {formatDate(post?._createdAt)}
          </p>
          <h1 className="heading !max-w-xl mx-auto">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
        </div>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image || "https://placehold.co/64x64"}
                alt={`${post.author.name}'s avatar`}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default Page
