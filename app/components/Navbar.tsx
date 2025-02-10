// Navbar.tsx (server component)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/auth'; // or wherever you defined it
import { LoginButton, LogoutButton } from './AuthButtons';

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
              <LogoutButton />
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{session.user.name}</span>
              </div>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
