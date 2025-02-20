"use client";
import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="px-3 py-2 border rounded hover:bg-gray-100"
    >
      Login with GitHub
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-3 py-2 border rounded hover:bg-gray-100 flex items-center"
    >
      <LogOut className="mr-2" />
      Logout
    </button>
  );
}
