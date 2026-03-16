'use client';

import { useState } from 'react';
import InputField from './InputField';

export default function DropdownHistory({
    label,
    name,
    value,
    onChange,
    history = [],
    placeholder,
    required = false,
    error,
}) {

    const [isFocused, setIsFocused] = useState(false);

    // Filter history to match current input, show last 5
    const filtered = history
        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);

    function handleHistorySelect(item) {
        onChange({
            target: {
                name,
                value: item,
            },
        });
        setIsFocused(false);
    }

    const shouldShowHistory = isFocused && filtered.length > 0;

    return (
        <div className='flex flex-col gap-2 w-full relative'>

            {/* Input */}
            <div
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setTimeout(() => setIsFocused(false), 150);
                }}
            >
                <InputField
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    error={error}
                    variant='black'
                />
            </div>

            {/* History Dropdown */}
            {shouldShowHistory && (
                <div className='absolute top-full mt-1 w-full z-10'>
                    <div className='border border-[var(--quiz-text)] rounded-md bg-[var(--white)] shadow-md max-h-48 overflow-y-auto'>

                        {filtered.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => handleHistorySelect(item)}
                                className={`
                                    w-full text-left px-4 py-2
                                    hover:bg-[var(--quiz-text)]/10
                                    text-sm
                                    text-[var(--quiz-text)]
                                    ${index < filtered.length - 1 ? 'border-b border-[var(--quiz-text)]/20' : ''}
                                `}
                            >
                                {item}
                            </button>
                        ))}

                    </div>
                </div>
            )}

        </div>
    );
}