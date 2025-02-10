// authOptions.ts (or similar)
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  })],
  // other options such as callbacks, session strategy, etc.
};

// In your API route (if using pages)
export default NextAuth(authOptions);
