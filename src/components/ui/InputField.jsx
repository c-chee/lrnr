'use client';

export default function InputField({
    label, // Text label above the input
    name, // Form state
    type = 'text', // Input type
    placeholder, // Example text, automatically disappears when typinig
    value, // Input value
    onChange, // State update/ modifier
    required = false, // Optional validation
    error,
    helperText,
}) {

    return (
        <div className='flex flex-col gap-2 w-full'>

            {/* Label */}
            <label htmlFor={name} className='text-sm font-medium'>
                {label}
            </label>

            {/* Input */}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`
                px-4 py-2
                rounded-md
                border
                transition
                focus:outline-none
                focus:ring-2
                ${
                    error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[var(--text-color)] focus:ring-[var(--highlight)]'
                }
                `}
            />

            {/* Helper Text */}
            {helperText && !error && (
                <p className='text-xs text-gray-500'>
                    {helperText}
                </p>
            )}

            {/* Error Text */}
            {error && (
                <p className='text-xs text-red-500'>
                    {error}
                </p>
            )}
        </div>
    );
}