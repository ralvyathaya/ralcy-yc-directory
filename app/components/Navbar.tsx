import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'

// Navbar component with user authentication status
const Navbar = async () => {
    // Get current session
    const session = await auth()

    return (
        <header className='px-5 py-3 bg-white font-work-sans shadow-sm'>
            <nav className='flex justify-between items-center'>
                {/* Logo/Home link */}
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={144} height={30} />
                </Link>

                {/* Navigation and auth buttons */}
                <div className='flex items-center gap-5 text-black'>
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                'use server'
                                await signOut()
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
                            'use server'
                            await signIn('github')
                        }}>
                            <button type="submit">
                                <span>Login with GitHub</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar