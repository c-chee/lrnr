'use client';

import SidebarQuizCard from '@/components/dashboard/SideBarQuizCard';
import UserStrip from '@/components/dashboard/UserStrip';

export default function DashboardSidebar({
    isOpen,
    onClose,
    quizzes,
    activeQuizId,
    onCardSelect,
    user,
}) {
    return (
        <aside className={`
            fixed lg:sticky top-[5em] lg:top-0 left-0 z-30
            h-screen w-72 shrink-0
            flex flex-col
            bg-[var(--dash-aside)]
            border-r border-[var(--slate-blue)]/20 
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
        `}>

            {/* ── Top bar -- */}
            <div className='flex items-center gap-3 px-5 py-5 border-b border-[var(--white)]/10 shrink-0'>

                {/* App icon */}
                <div className='w-9 h-9 rounded-xl bg-[var(--slate-blue)] flex items-center justify-center text-lg shadow-lg shadow-[var(--slate-blue)]/30 shrink-0 pt-1 pl-1'>
                    <img src='/icon.png' className='rounded-xl' />
                </div>

                {/* Sidebar title */}
                <span className='text-[22px] font-extrabold tracking-tight text-[var(--white)]'>
                    Quizes
                </span>

                {/* Close button — small screens only */}
                <button
                    onClick={onClose}
                    className='ml-auto text-[var(--white)]/40 hover:text-[var(--white)]/80 lg:hidden transition-colors p-1'
                    aria-label='Close sidebar'
                >
                    ✕
                </button>
            </div>

            {/* -- History List -- */}
            <div className='flex-1 px-3 py-4 overflow-y-auto'>

                <p className='text-[10px] font-bold tracking-widest uppercase text-[var(--white)]/45 px-2 mb-3'>
                    Quiz History
                </p>

                {/* Empty state  and if there is a quiz history */}
                {quizzes.length === 0 ? (
                    <p className='text-center text-[var(--white)]/30 text-sm italic py-8 px-4'>
                        No quizzes yet.<br />Create your first one!
                    </p>
                ) : (
                    <div className='flex flex-col gap-1.5'>
                        {quizzes.map(quiz => (
                            <SidebarQuizCard
                                key={quiz.id}
                                quiz={quiz}
                                isActive={activeQuizId === quiz.id}
                                onSelect={onCardSelect}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* -- Bottom bar -- */}
            <UserStrip user={user} quizCount={quizzes.length} />

        </aside>
    );
}