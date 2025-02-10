// Navbar.tsx (server component)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/auth'; // or wherever you defined it

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <header className='px-5 py-3 bg-white font-work-sans shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form action={async () => {
                'use server';
                // use a server action or API route for sign-out
                // signOut is typically used on the client via next-auth/react
              }}>
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              'use server';
              // similarly, signIn (with GitHub) is typically imported from next-auth/react on the client
            }}>
              <button type="submit">
                <span>Login with GitHub</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
