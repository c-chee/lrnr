'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className=' relative overflow-hidden w-full px-6 md:px-15 lg:px-18 py-12 lg:pb-10 transition-colors duration-300 bg-[var(--footer-bg)] text-[var(--background)]'>

            {/* === Grid container === */}
            <div className='mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10'>

                {/* [ Left column ] */}
                <div className='flex flex-col space-y-6'>
                    
                    {/* --- Logo --- */}
                    <div>
                        {/* Light theme title */}
                        <img src='/lrnr_title_white.png' alt='LRNR' className='w-[7em] block dark:hidden' />

                        {/* Dark theme title */}
                        <img src='/lrnr_title_black.png' alt='LRNR' className='w-[7em] hidden dark:block'/>
                    </div>

                    {/* --- Links --- */}
                    <div className='flex flex-col space-y-2 text-md'>
                        <Link href='/'>Home</Link>
                        <Link href='/login'>Login</Link>
                        <Link href='/signup'>Signup</Link>
                        <Link href='/generate'>Generate Quiz</Link>
                    </div>

                </div>

                {/* [ Right column ] */}
                {/* Empty right side for lg layout spacing */}
                <div className='hidden lg:block'></div>

            </div>

            {/* === Divider === */}
            <div className='border-t mt-10 pt-6 border-[var(--background)] mx-auto'>
                <p className='text-sm'>
                    © 2026. LRNR. All rights reserved
                </p>
            </div>

            {/* === Turtle Mascot (Large screens only) === */}
            <div className='hidden lg:block absolute -bottom-40 -right-28 pointer-events-none'>
                <img src='/turtle_outlined.png' alt='LRNR Turtle' className='w-[550px] xl:w-[600px]' />
            </div>

        </footer>
    );
}