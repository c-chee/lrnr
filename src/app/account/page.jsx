'use client';

// === Imports ===
import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSideBar';
import DashboardTopBar  from '@/components/dashboard/DashboardTopBar';
import QuizFormCard     from '@/components/dashboard/QuizFormCard';

// === Mock Examples ===
const EXAMPLE_USER = { name: 'John' };

const EXAMPLE_HIST = {
    topics: ['Naruto', 'Fairy Tail', 'My Hero Academia', 'Frieren Beyond Journeys End', 'Periodic Table'],
    styles: ['Story', 'Normal', 'Teacher', 'Normal', 'Formal'],
    quizzes: [
        { id: 1, topic: 'Naruto', level: 'Expert', count: 20, style: 'Story' },
        { id: 2, topic: 'Fairy Tail', level: 'Intermediate', count: 15, style: 'Normal' },
        { id: 3, topic: 'My Hero Academia', level: 'Novice', count: 5, style: 'Teacher' },
        { id: 4, topic: 'Frieren Beyond Journeys End', level: 'Intermediate', count: 16, style: 'Normal' },
        { id: 5, topic: 'Periodic Table', level: 'Novice', count: 8, style: 'Formal' },
    ],
};

const EMPTY_FORM = { topic: '', level: '', count: '', style: '' }; // The blank form state used on first load and after a card is deselected

export default function DashboardHome() {

  // -- States --
    const [activeQuizId, setActiveQuizId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formValues, setFormValues] = useState(EMPTY_FORM);

    // -- Data --
    const user = EXAMPLE_USER;
    const history = EXAMPLE_HIST;


    // -- Handlers --
    function handleCardSelect(quizId, values) {
        if (activeQuizId === quizId) {
            setActiveQuizId(null);
            setFormValues(EMPTY_FORM);
        } else {
            setActiveQuizId(quizId);
            setFormValues(values);
        }
    }

    function handleFormChange(updated) {
        setFormValues(updated);
        setActiveQuizId(null);
    }

    // -- Display --
    return (
        <div className='flex min-h-screen bg-[var(--background-secondary)] text-[var(--text-color)]'>

            {/* Overlay - Used with left side bar on smaller screens */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 z-20 bg-black/40 lg:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Left sidebar */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                quizzes={history.quizzes}
                activeQuizId={activeQuizId}
                onCardSelect={handleCardSelect}
                user={user}
            />

            {/* Main Content — topbar and quiz form */}
            <div className='flex-1 flex flex-col min-h-screen min-w-0'>

                {/* Displays user info */}
                <DashboardTopBar
                    user={user}
                    onOpenSidebar={() => setSidebarOpen(true)}
                />

                {/* Quiz form */}
                <main className='flex-1 flex items-start justify-center px-4 sm:px-8 py-10 sm:py-14'>
                    <QuizFormCard
                        user={user}
                        history={history}
                        formValues={formValues}
                        onFormChange={handleFormChange}
                        hasActiveQuiz={activeQuizId !== null}
                    />
                </main>

            </div>

        </div>
    );
}