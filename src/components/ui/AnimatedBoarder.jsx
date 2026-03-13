export default function AnimatedBorder() {
    return (
        <>
            {/* --- Edges --- */}

            {/* Top edge */}
            <span
                className='absolute top-0 left-4 right-4 h-[2px] bg-current
                scale-x-0 origin-left transition-transform duration-300
                group-hover:scale-x-100 group-hover:delay-0'
            ></span>

            {/* Right edge */}
            <span
                className='absolute right-0 top-4 bottom-4 w-[2px] bg-current
                scale-y-0 origin-top transition-transform duration-300
                group-hover:scale-y-100 group-hover:delay-75'
            ></span>

            {/* Bottom edge */}
            <span
                className='absolute bottom-0 left-4 right-4 h-[2px] bg-current
                scale-x-0 origin-right transition-transform duration-300
                group-hover:scale-x-100 group-hover:delay-150'
            ></span>

            {/* Left edge */}
            <span
                className='absolute left-0 top-4 bottom-4 w-[2px] bg-current
                scale-y-0 origin-bottom transition-transform duration-300
                group-hover:scale-y-100 group-hover:delay-200'
            ></span>

            {/* --- Corners --- */}

            {/* Top left corner */}
            <span
                className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-xl
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100 group-hover:delay-[350ms] border-current'
            ></span>

            {/* Top right corner */}
            <span
                className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-xl
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100 group-hover:delay-[200ms] border-current'
            ></span>

            {/* Bottom right corner */}
            <span
                className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-xl
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100 group-hover:delay-[250ms] border-current'
            ></span>

            {/* Bottom left corner */}
            <span
                className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-xl
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100 group-hover:delay-[300ms] border-current'
            ></span>
        </>
    );
}