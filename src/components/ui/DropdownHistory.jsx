'use client';

import { useState } from 'react';
import InputField from './InputField';
import DropdownField from '@/components/ui/DropdownField';

export default function DropdownHistory({
    label,
    name,
    value,
    onChange,
    history = [],
    placeholder,
    required = false,
}) {

    const [isFocused, setIsFocused] = useState(false);

    // Only show last 5
    const lastFive = history.slice(0, 5);

    function handleHistorySelect(e) {
        onChange({
            target: {
                name,
                value: e.target.value,
            },
        });

        setIsFocused(false); // hide dropdown after selecting
    }

    const shouldShowHistory =
        isFocused &&
        value.trim() === '' &&
        lastFive.length > 0;

    return (
        <div className='flex flex-col gap-2 w-full relative'>

            {/* Input */}
            <div
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    // small delay prevents dropdown from disappearing
                    // before click registers
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
                />
            </div>

            {/* History Dropdown (Auto Hidden) */}
            {shouldShowHistory && (
                <div className='absolute top-full mt-1 w-full z-10'>
                    <div className='border rounded-md bg-white shadow-md max-h-48 overflow-y-auto'>

                        {lastFive.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() =>
                                    handleHistorySelect({
                                        target: { value: item },
                                    })
                                }
                                className='
                                    w-full text-left px-4 py-2
                                    hover:bg-gray-100
                                    text-sm
                                '
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