'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HollowButton from '@/components/ui/PillButtonHollow';

export default function AccountNavbar() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout', {
        method: 'POST',
        });

        router.push('/'); // redirect to landing page
        router.refresh(); // clear cached data
    };

    return (
        <header>
            <nav className='fixed top-0 left-0 w-full z-50 bg-[var(--background)]'>
                <div className='max-w-8xl mx-auto px-6 md:px-10 lg:px-12 py-5 flex justify-between items-center'>
                
                    {/* === Logo === */}
                    <div>
                        {/* Light Theme */}
                        <Link href='/account' className='flex'>
                            <img
                                src='/lrnr_title_black.png'
                                alt='LRNR'
                                className='w-[6em] md:w-[7em] lg:w-[8em] block dark:hidden'
                            />
                        </Link>

                        {/* Dark Theme */}
                        <Link href='/account'>
                            <img
                                src='/lrnr_title_white.png'
                                alt='LRNR'
                                className='w-[6em] md:w-[7em] lg:w-[8em] hidden dark:block'
                            />
                        </Link>
                    </div>

                    {/* === Links === */}
                    <div>
                        {/* <HollowButton href='/generate' className='mx-1 lg:mx-2'>
                            Generate a quiz
                        </HollowButton> */}

                        <HollowButton onClick={handleLogout} className='mx-1 lg:mx-2' >
                            Logout
                        </HollowButton>
                    </div>
                </div>
            </nav>
        </header>
    );
}