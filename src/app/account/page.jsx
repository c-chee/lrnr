'use client';

// === Imports ===
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import DashboardSidebar from '@/components/dashboard/DashboardSideBar';
import DashboardTopBar from '@/components/dashboard/DashboardTopBar';
import QuizFormCard from '@/components/dashboard/QuizFormCard';
import DashboardCard from '@/components/dashboard/DashboardCard';

// === Mock Examples ===
const EXAMPLE_USER = { name: 'John' };

/** (Used for testing)
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
*/

const EMPTY_FORM = { topic: '', level: '', count: '', style: '' }; // The blank form state used on first load and after a card is deselected

export default function DashboardHome() {

  // -- States --
    const router = useRouter();
    
    const [activeQuizId, setActiveQuizId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formValues, setFormValues] = useState(EMPTY_FORM);
    const [user, setUser] = useState(EXAMPLE_USER);
    const [history, setHistory] = useState({ topics: [], styles: [], quizzes: [] });
    const [loading, setLoading] = useState(false); // For submit loading
    
    const searchParams = useSearchParams();
    const view = searchParams.get('view') || 'dashboard';
    const showDashboard = view === 'dashboard';

    // -- Data --
    // const user = EXAMPLE_USER;
    // const history = EXAMPLE_HIST;

    // -- Effects --
    // Fetch user info and quiz history from DB
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const res = await fetch('/api/dashboard'); // API route returns { user, quizzes }
                const data = await res.json();
                setUser(data.user);
                setHistory({
                    topics: data.quizzes.map(q => q.topic),
                    styles: data.quizzes.map(q => q.style),
                    quizzes: data.quizzes,
                });
            } catch (err) {
                console.error('Error fetching dashboard data', err);
            }
        }
        fetchDashboardData();
    }, []);

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

    // Handler to submit a quiz form to DB
    async function handleFormSubmit() {
        setLoading(true);
        try {
            const res = await fetch('/api/quizzes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    topic: formValues.topic,
                    level: formValues.level,
                    num_questions: formValues.count,
                    question_style: formValues.style,
                }),
            });

            const newQuiz = await res.json();

            // Update local state so sidebar updates without refresh
            setHistory(prev => ({
                topics: [...prev.topics, newQuiz.topic],
                styles: [...prev.styles, newQuiz.question_style],
                quizzes: [...prev.quizzes, newQuiz],
            }));

            // Reset form
            setFormValues(EMPTY_FORM);
            setActiveQuizId(newQuiz.id);

        } catch (err) {
            console.error('Error submitting quiz', err);
        } finally {
            setLoading(false);
        }
    }


    // -- Display --
    return (
        <div className='flex min-h-screen bg-[var(--background-secondary)] text-[var(--text-color)]'>

        {/* Overlay - Used with left side bar on smaller screens */}
        {sidebarOpen && (
            <div
                className='fixed inset-0 z-20 bg-[var(--dash-aside)]/60 lg:hidden'
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

            {/* Right content */}
            <main className='flex-1 flex items-start justify-center px-4 sm:px-8 py-10 sm:py-14 w-full'>

                {/* Dashboard states */}
                {showDashboard ? (
                    <div className='grid grid-rows-3 sm:grid-rows-2 sm:grid-cols-2 gap-6 w-full max-w-4xl'>

                        <DashboardCard
                            title='Streak'
                            subtitle='Login everyday to continue the streak.'
                            number={7}
                            variant='one'
                        />

                        <DashboardCard
                            title='Points'
                            subtitle='Complete more quizes to earn more points.'
                            number={1200}
                            variant='two'
                        />

                        <div className='sm:col-span-2'>
                            <DashboardCard
                                title='Generate Quiz'
                                subtitle='Click to start a new quiz'
                                variant='three'
                                onClick={() => router.push('/account?view=quiz')}
                            />
                        </div>

                    </div>
                ) : (
                    <div className='w-full max-w-4xl justify-items-center'>
                        {/* Back Button */}
                        <button
                            onClick={() => router.push('/account?view=dashboard')}
                            className='
                                mb-6 
                                text-sm font-medium 
                                text-[var(--accent-color)] 
                                hover:underline underline-offset-4
                                cursor-pointer
                            '
                        >
                            ← Back to Dashboard
                        </button>

                        <QuizFormCard
                            user={user}
                            history={history}
                            formValues={formValues}
                            onFormChange={handleFormChange}
                            onFormSubmit={handleFormSubmit}
                            hasActiveQuiz={activeQuizId !== null}
                            loading={loading}
                        />
                    </div>
                )
                }

            </main>

        </div>

        </div>
    );
}