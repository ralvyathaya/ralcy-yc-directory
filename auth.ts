// Core authentication configuration file
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DefaultSession } from "next-auth";

// Extend the built-in session type to include user ID
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

// Configure authentication options
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    // Configure GitHub OAuth provider
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Your secret key for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    // Callback to handle JWT token creation
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Callback to handle session data
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});