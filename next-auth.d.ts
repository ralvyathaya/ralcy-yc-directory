import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }

  interface Profile {
    id: string;
    login: string;
    bio?: string;
    avatar_url?: string;
  }
}