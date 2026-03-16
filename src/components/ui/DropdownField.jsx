'use client';

import { useState, useRef, useEffect } from 'react';

export default function DropdownField({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    error,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find(o => o.value === value);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSelect(optionValue) {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    }

    return (
        <div className='flex flex-col gap-2 w-full relative' ref={ref}>

            {/* Label */}
            <label className='text-sm font-medium text-[var(--quiz-text)]'>
                {label}
            </label>

            {/* Trigger button */}
            <button
                type='button'
                onClick={() => setIsOpen(prev => !prev)}
                className={`
                    px-4 py-2
                    rounded-md
                    border
                    bg-[var(--quiz-background)]
                    text-[var(--quiz-text)]
                    text-left
                    flex justify-between items-center
                    transition
                    focus:outline-none
                    focus:ring-2
                    cursor-pointer
                    ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-[var(--quiz-text)] focus:ring-[var(--highlight)]'
                    }
                `}
            >
                <span className={selected ? '' : 'opacity-50'}>
                    {selected ? selected.label : 'Select an option'}
                </span>
                {/* Chevron */}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill='none' stroke='currentColor' viewBox='0 0 24 24'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
            </button>

            {/* Dropdown list */}
            {isOpen && (
                <div className='
                    absolute z-10 mt-1 w-full
                    border border-[var(--quiz-text)]
                    rounded-md
                    bg-[var(--quiz-background)]
                    shadow-md
                    max-h-48 overflow-y-auto
                '>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            type='button'
                            onClick={() => handleSelect(option.value)}
                            className={`
                                w-full text-left px-4 py-2
                                hover:bg-[var(--quiz-text)]/10
                                text-sm
                                text-[var(--quiz-text)]
                                cursor-pointer
                                ${index < options.length - 1 ? 'border-b border-[var(--quiz-text)]/20' : ''}
                            `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <p className='text-xs text-red-500'>{error}</p>
            )}

        </div>
    );
}