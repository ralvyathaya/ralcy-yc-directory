import "server-only"
import { defineLive } from "next-sanity"
import { ClientError } from "@sanity/lib/client"

export const {sanityFetch, SanityLive} = defineLive({client})