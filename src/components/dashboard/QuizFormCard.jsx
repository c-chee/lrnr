
'use client';

import QuizForm from '@/components/forms/QuizForm';

export default function QuizFormCard({
    user,
    history,
    formValues,
    onFormChange,
    hasActiveQuiz,
}) {
    return (
        <div className='
            w-full max-w-lg
            bg-[var(--quiz-background)]
            rounded-2xl
            border border-[#7067cf]/15
            shadow-xl shadow-[#330c2f]/8
            px-6 sm:px-10 py-8 sm:py-10
        '>
            {/* Title */}
            <h1 className='text-[22px] sm:text-[26px] font-extrabold tracking-tight text-[var(--midnight-violet)] mb-1'>
                Create a Quiz
            </h1>

            <p className='text-[13px] text-[#415d5a] mb-4'>
                {hasActiveQuiz
                    ? 'Loaded from history - edit below or create as-is.'
                    : 'Enter a new topic or select from your past topics.'
                }
            </p>

            <QuizForm
                user={user}
                history={history}
                formValues={formValues}
                onFormChange={onFormChange}
            />
        </div>
    );
}