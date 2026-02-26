'use client';
import Link from 'next/link';

export default function PillButtonHollow({
    href,
    children,
    onClick,
    className,
    }) {
    return (
        <Link
        href={href}
        onClick={onClick}
        className={`
            inline-flex items-center justify-center
            px-[10px] py-[2] md:px-[15px] md:py-[4px]
            rounded-full
            text-[15px]
            font-semibold

            border-[2.5px] border-[var(--button-bg)]
            bg-transparent
            text-[var(--button-bg)]

            transition-all duration-500 ease-in-out

            hover:bg-[var(--button-bg)]
            hover:text-[var(--button-text)]

            ${className ?? ''}
        `}
        >
            {children}
        </Link>
    );
}