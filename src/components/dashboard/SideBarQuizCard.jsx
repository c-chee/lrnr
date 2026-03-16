'use client';

export default function SidebarQuizCard({ quiz, isActive, onSelect }) {

    return (
        <button
            onClick={() => onSelect({
                // Pass back exactly the four fields <QuizForm> controls,so the parent can drop them straight into form state.
                topic: quiz.topic,
                level: quiz.level,
                count: String(quiz.count), // form state stores count as string
                style: quiz.style,
            })}
            className={`
                w-full text-left px-3 py-3 rounded-xl border transition-all duration-150 cursor-pointer
                ${isActive
                    // Active - highlighted
                    ? 'border-[var(--quiz-card)] bg-[var(--quiz-card)]/20'
                    // Inactive - no highlight
                    : 'border-transparent hover:bg-[var(--white)]/8'
                }
            `}
        >
            {/* ── Topic ── */}
            <div className='flex items-start justify-between gap-2 mb-2'>
                <span className='text-[13px] font-bold text-[var(--white)] leading-tight truncate'>
                    {quiz.topic}
                </span>
            </div>

            {/* ── Level / Count / Style tags ── */}
            <div className='flex flex-wrap gap-1.5'>

                {/* Expertise level */}
                <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full text-[var(--quiz-card-text)]`}>
                    {quiz.level}
                </span>

                {/* Number of questions */}
                <span className='text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--white)]/10 text-[var(--quiz-card-text)]'>
                    {quiz.count}Q
                </span>

                {/* Question style */}
                <span className='text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--white)]/10 text-[var(--quiz-card-text)] truncate'>
                    {quiz.style}
                </span>

            </div>
        </button>
    );
}