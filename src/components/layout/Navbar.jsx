'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// === Components ===
import HollowButton from '@/components/ui/PillButtonHollow'


export default function Navbar() {

    return (
        <header>
            <nav className='fixed flex justify-between place-items-center w-full top-0 z-50 px-6 md:px-15 lg:px-18 py-6'>
                {/* --- Logo --- */}
                <div>
                    {/* Light theme title */}
                    <Link href='/' className='flex'>
                        <img src='/lrnr_title_black.png' alt='LRNR' className='w-[6em] md:w-[7em] lg:w-[8em] block dark:hidden'/>
                    </Link>

                    {/* Dark theme title */}
                    <Link href='/'>
                        <img src='/lrnr_title_white.png' alt='LRNR' className='w-[6em] md:w-[7em] lg:w-[8em] hidden dark:block'/>
                    </Link>

                </div>

                {/* --- Links --- */}
                <div className='place-items-center'>
                    <HollowButton href='/login' className='mx-1 lg:mx-2'>Login</HollowButton>
                    <HollowButton href='/signup' className='mx-1 lg:mx-2'>Sign up</HollowButton>
                </div>
            </nav>
        </header>
    );
}