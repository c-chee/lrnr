'use client';

import PillButton from '@/components/ui/PillButton';
import { useState } from 'react';

export default function QuizCards({ questions = [], onRestart }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentIndex];

    function handleSelect(option) {
        setSelectedAnswer(option);
    }

    function handleNext() {
        if (selectedAnswer === null) return;

        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = selectedAnswer;

        const correctAnswer = currentQuestion.answer;

        //check if correct
        if (selectedAnswer === correctAnswer) {
            setScore(prev => prev + 1);
        }

        setAnswers(updatedAnswers);
        setSelectedAnswer(null);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    }

    if (!questions.length) {
        return (
            <div className="text-center text-gray-500">
                No quiz questions available
            </div>
        );
    }

    // Results
    if (showResults) {
        return (
            <div className='w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 text-center'>
                <h2 className='text-2xl font-bold mb-4'>Quiz Complete!</h2>
                <p className="text-lg mb-6">
                    You scored {score} out of {questions.length}
                </p>
                <div className="text-left space-y-4">
                    {questions.map((q, i) => (
                        <div key={i} className="border-b pb-3">
                            <p className="font-semibold">{q.question}</p>

                            <p>
                                Your answer:{" "}
                                <span className={answers[i] === q.answer ? "text-green-600" : "text-red-600"}>
                                    {answers[i]}
                                </span>
                            </p>
                            {answers[i] !== q.answer && (
                                <p className="text-green-600">
                                    Correct answer: {q.answer}
                                </p>
                            )}
                            <p className="text-sm text-gray-600 mt-1">
                                {q.explanation}
                            </p>
                        </div>
                    ))}
                        <div className='flex justify-center mt-8'>
                            <PillButton
                            onClick={onRestart}
                            variant='primary'
                            >
                                Start a New Quiz
                            </PillButton>
                        </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">

            {/* Question counter */}
            <div className="text-sm text-gray-500 mb-2">
                Question {currentIndex + 1} of {questions.length}
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold mb-6">
                {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(option)}
                        className={`p-3 rounded-lg border text-left transition
                            ${selectedAnswer === option
                                ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10'
                                : 'border-gray-300 hover:border-[var(--accent-color)]'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Next button */}
            <div className="flex justify-end mt-6">
                <PillButton
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    variant="secondary"
                >
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </PillButton>
            </div>

        </div>
    );
}