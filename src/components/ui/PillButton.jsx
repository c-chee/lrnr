'use client';
import Link from 'next/link';

export default function PillButton({
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
            bg-[var(--button-bg)]
            text-[var(--button-text)]

            transition-all duration-500 ease-in-out

            hover:bg-transparent
            hover:text-[var(--button-bg)]

            ${className ?? ''}
        `}
        >
            {children}
        </Link>
    );
}