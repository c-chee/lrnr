'use client';

export default function DropdownField({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    error,
}) {
    return (
        <div className='flex flex-col gap-2 w-full'>

            {/* Label */}
            <label htmlFor={name} className='text-sm font-medium'>
                {label}
            </label>

            {/* Select */}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`
                    px-4 py-2
                    rounded-md
                    border
                    bg-transparent
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-[var(--text-color)] focus:ring-[var(--highlight)]'
                    }
                `}
            >
                <option value=''>Select an option</option>

                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Error */}
            {error && (
                <p className='text-xs text-red-500'>
                    {error}
                </p>
            )}
        </div>
    );
}