'use client';
import Link from 'next/link';

export default function Footer({ type }) {
    // Decide links based on type prop
    let links;
    if (type === 'account') {
        links = [
        { href: '/', label: 'Home' },
        { href: '/generate', label: 'Generate Quiz' },
        ];
    } else {
        links = [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
        { href: '/signup', label: 'Signup' },
        { href: '/generate', label: 'Generate Quiz' },
        ];
    }

    return (
        <footer className='w-full bg-[var(--footer-bg)] text-[var(--background)]'>
            <div className='max-w-8xl mx-auto px-6 md:px-10 lg:px-12 py-5'>

                <div className='grid grid-cols-1 lg:grid-cols-2'>

                {/* Left */}
                <div className='flex flex-col space-y-6'>
                    <div>
                        <img src='/lrnr_title_white.png' alt='LRNR' className='w-[7em] block dark:hidden' />
                        <img src='/lrnr_title_black.png' alt='LRNR' className='w-[7em] hidden dark:block' />
                    </div>

                    <div className='flex flex-col space-y-2 text-md'>
                        {links.map(link => (
                            <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                    </div>
                </div>

                <div className='hidden lg:block'></div>
                </div>

                <div className='border-t mt-10 pt-6 border-[var(--background)]'>
                    <p className='text-sm'>
                        © 2026. LRNR. All rights reserved
                    </p>
                </div>

            </div>

            {/* === Turtle Mascot (Large screens only) === */}
            {/* <div className='hidden lg:block absolute -bottom-40 -right-28 pointer-events-none'>
                <img src='/turtle_outlined.png' alt='LRNR Turtle' className='w-[550px] xl:w-[600px]' />
            </div> */}
        </footer>
    );
}