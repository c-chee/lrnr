'use client'
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default function PageTitle({
    children,
    className = '',
    }) {

    return (
        <h3 className={`${cormorant.className} font-semibold text-[2em] md:text-[2.5em] lg:text-[3em] pb-8 ${className}`} >
            {children}
        </h3>
    );
}