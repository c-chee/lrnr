import PageTitle from '@/components/ui/PageTitle';
import GenerateQuiz from '@/components/forms/QuizForm';

export const metadata = {
    title: 'Generate Quiz',
};

export default function generate() {
    return (
        <div className='flex flex-col w-screen min-h-screen items-center justify-start'>
            <PageTitle>Generate Quiz</PageTitle>
            <GenerateQuiz />
        </div>
    )
}