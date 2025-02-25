import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // Add signIn callback to save user data to Sanity
    async signIn({ user, profile }) {
      // Guard: Ensure profile exists
      if (!profile) {
        return false;
      }
      const githubId = profile.id;
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: githubId,
          name: user.name,
          username: profile.login,
          email: user.email,
          image: user.image,
          bio: profile.bio || "",
        });
      }

      return true;
    },
    // Update jwt callback to store Sanity document ID
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const githubId = profile.id;
        const sanityUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

        if (sanityUser) {
          token.id = sanityUser._id;
        }
      }
      return token;
    },
    // Update session callback to include Sanity ID
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};

// For use in API route files.
export const handlers = NextAuth(authOptions);