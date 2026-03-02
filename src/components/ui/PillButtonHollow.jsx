'use client';
import Link from 'next/link';

export default function PillButtonHollow({
    href,
    children,
    onClick,
    className,
    type = 'button', // default button type
    }) {

    const baseStyles = `
        inline-flex items-center justify-center
        px-[12px] py-[2px] md:px-[15px] md:py-[4px]
        rounded-full
        text-[15px]
        font-semibold
        border-[2.5px] border-[var(--button-bg)]
        bg-transparent
        text-[var(--button-bg)]
        transition-all duration-500 ease-in-out
        hover:bg-[var(--button-bg)]
        hover:text-[var(--button-text)]
        ${className}
    `;

    // If href exists, render Link
    if (href) {
        return (
        <Link href={href} className={baseStyles}>
            {children}
        </Link>
        );
    }

    // Else render a button
    return (
        <button
            type={type}
            onClick={onClick}
            className={baseStyles}
        >
            {children}
        </button>
    );
}