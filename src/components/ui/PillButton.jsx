'use client';
import Link from 'next/link';

export default function PillButton({
    href,
    children,
    onClick,
    className = '',
    variant = 'primary', // default style
    type = 'button', // default button type
    disabled = false,
    }) {

    const variants = {
        primary: `
            border-[var(--button-bg)]
            bg-[var(--button-bg)]
            text-[var(--button-text)]
            hover:bg-transparent
            hover:text-[var(--button-bg)]
        `,
        secondary: `
            border-[var(--button-bg-secondary)]
            bg-[var(--button-bg-secondary)]
            text-[var(--button-text)]
            hover:bg-transparent
            hover:text-[var(--button-bg-secondary)]
        `
    };

    const baseStyles = `
        inline-flex items-center justify-center
        px-[12px] py-[2px] md:px-[15px] md:py-[4px]
        rounded-full
        text-[15px]
        font-semibold
        border-[2.5px]
        transition-all duration-500 ease-in-out
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
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