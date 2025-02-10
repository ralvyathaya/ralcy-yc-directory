'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn('github')}
      className="flex items-center gap-2 hover:text-gray-600"
    >
      <span>Login with GitHub</span>
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="hover:text-gray-600"
    >
      <span>Logout</span>
    </button>
  );
};