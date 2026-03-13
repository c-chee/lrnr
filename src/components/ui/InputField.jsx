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
    className = '',
    variant, // optional style modifier
}) {

    const variants = {
        // Force black text (for light backgrounds)
        black: `
            text-black
            border-black
            placeholder:text-black/60
            focus:ring-[var(--highlight)]
        `,
    };

    // Default style (theme controlled)
    const baseInputStyles = `
        px-4 py-2
        rounded-md
        border
        bg-transparent
        text-[var(--text-color)]
        placeholder:opacity-60
        transition
        focus:outline-none
        focus:ring-2
        border-[var(--text-color)]
        focus:ring-[var(--highlight)]
        ${error ? 'border-red-500 focus:ring-red-500' : ''}
        ${variant ? variants[variant] : ''}
        ${className}
    `;

    const labelStyles = `
        text-sm font-medium
        ${variant === 'black' ? 'text-black' : 'text-[var(--text-color)]'}
    `;

    return (
        <div className='flex flex-col gap-2 w-full'>

            {/* Label */}
            <label htmlFor={name} className={labelStyles}>
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
                className={baseInputStyles}
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