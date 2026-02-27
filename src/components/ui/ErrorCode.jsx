'use client'
import Button from '@/components/ui/PillButton'

export default function ErrorCode({
    children,
    className = ''
}) {
    return (
        <div className={`flex flex-col place-items-center ${className}`}>

            <img src='/turtle_outlined.png' alt='LRNR Turtle' className='w-[8em] md:w-[9em] lg:w-[10em] pb-1'/>

            <h3 className='font-semibold text-[2em] md:text[2.5em]  lg:text-[3em] pb-8'>{children}</h3>

            <Button href='/'>Back to home</Button>

        </div>
    );
}