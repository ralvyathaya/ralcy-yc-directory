import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
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
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
};

// Export handlers for Next.js API route
export const handlers = NextAuth(authOptions);