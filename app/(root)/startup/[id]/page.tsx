import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked'; // Replace markdown-it with marked

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  // Use marked to parse the markdown content
  const parsedContent = marked(post?.pitch || "");

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className='section_container'>
        <Image
          src={post.image}
          alt="thumbnail"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author._id}`} className='flex gap-2 items-center mb-3'>
              <Image
                src={urlFor(post.author.image).url()}
                alt={`${post.author.name}'s avatar`}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">@{post.author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article dangerouslySetInnerHTML={{ __html: parsedContent }} />
          ) : (
            <p className='no-result'>No details provided</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;