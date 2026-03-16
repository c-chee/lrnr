'use client'
import { Cormorant_Garamond } from 'next/font/google';

import Button from '../ui/PillButton';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default function Hero() {
    return (
        <section className='flex w-full px-6 md:px-15 lg:px-18 py-10 md:py-16 lg:py-20 justify-center items-start'>

            {/* === Content grid === */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl items-center'>

                {/* Left column */}
                <div className='text-[var(--text-color)] text-center md:text-left pt-16 md:pt-0'>

                    <h1 className={`${cormorant.className} text-[50px] sm:text-[55px] md:text-[57px] lg:text-[65px] font-light mb-6`}>
                        Custom Quizzes Powered by AI
                    </h1>

                    <p className='mb-8 text-base text-[20px] opacity-80 mx-auto md:mx-0'>
                        Create personalized quizzes in seconds based on your topic, skill level, and learning goals.
                    </p>

                    <div className='flex justify-self-center md:justify-start'>
                        <Button href='/generate' className='mx-1 lg:mx-2' variant='secondary'>
                            Generate a quiz
                        </Button>
                    </div>

                </div>

                {/* Right column */}
                <div className='flex justify-center'>
                    <img
                        src='/turtle_outlined.png'
                        alt='LRNR Turtle'
                        className='hidden sm:hidden md:block md:w-[20em] lg:w-[30em] object-contain '
                    />
                </div>

            </div>

        </section>
    );
}
