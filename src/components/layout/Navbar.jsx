'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// === Components ===
import HollowButton from '@/components/ui/PillButtonHollow'


export default function Navbar() {

    return (
        <header>
            <nav className='fixed top-0 left-0 w-full z-50 bg-[var(--background)]'>
                <div className='max-w-8xl mx-auto px-6 md:px-10 lg:px-12 py-5 flex justify-between items-center'>
                
                    {/* === Logo === */}
                    <div>
                        {/* Light Theme */}
                        <Link href='/' className='flex'>
                            <img
                                src='/lrnr_title_black.png'
                                alt='LRNR'
                                className='w-[6em] md:w-[7em] lg:w-[8em] block dark:hidden'
                            />
                        </Link>

                        {/* Dark Theme */}
                        <Link href='/'>
                            <img
                                src='/lrnr_title_white.png'
                                alt='LRNR'
                                className='w-[6em] md:w-[7em] lg:w-[8em] hidden dark:block'
                            />
                        </Link>
                    </div>

                    {/* === Links === */}
                    <div>
                        <HollowButton href='/login' className='mx-1 lg:mx-2'>
                            Login
                        </HollowButton>

                        <HollowButton href='/signup' className='mx-1 lg:mx-2'>
                            Sign up
                        </HollowButton>
                    </div>
                </div>
            </nav>
        </header>
    );
}