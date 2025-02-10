// auth.ts
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Extend the built-in Session type so that we have a user.id property.
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
    // Pass extra properties from the user to the token.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Use GitHub’s default image field; GitHub returns "avatar_url" by default.
        token.image = user.image;
      }
      return token;
    },
    // Make the token properties available on session.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

// For use in API route files.
export const handlers = NextAuth(authOptions);
