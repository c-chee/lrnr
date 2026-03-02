'use client';
import Link from 'next/link';

export default function PillButton({
    href,
    children,
    onClick,
    className = '',
    type = 'button', // default button type
    disabled = false,
    }) {

    const baseStyles = `
        inline-flex items-center justify-center
        px-[12px] py-[2px] md:px-[15px] md:py-[4px]
        rounded-full
        text-[15px]
        font-semibold
        border-[2.5px] border-[var(--button-bg)]
        bg-[var(--button-bg)]
        text-[var(--button-text)]
        transition-all duration-500 ease-in-out
        hover:bg-transparent
        hover:text-[var(--button-bg)]
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
        ${className}
    `;

    // If href exists, render a link
    if (href) {
        return (
            <Link
                href={href}
                className={baseStyles}
            >
                {children}
            </Link>
        );
    }

    // Else, render a button
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseStyles}
        >

            {children}

        </button>
    );
}