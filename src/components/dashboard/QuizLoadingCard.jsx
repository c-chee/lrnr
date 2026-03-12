'use client';

export default function QuizLoadingCard() {

    return (
        <div className='relative overflow-hidden border border-[var(--border-color)] rounded-xl shadow-lg p-8 w-full max-w-md'>

            <div className='absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent' />

            <div className='flex flex-col gap-4'>

                <div className='h-6 w-1/2 bg-white/10 rounded' />

                <div className='h-4 w-full bg-white/10 rounded' />
                <div className='h-4 w-5/6 bg-white/10 rounded' />
                <div className='h-4 w-2/3 bg-white/10 rounded' />

                <div className='text-sm text-center opacity-60 mt-6'>
                    Generating your quiz...
                </div>

            </div>

        </div>
    );
}