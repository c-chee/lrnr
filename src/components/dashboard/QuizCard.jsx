'use client';

import PillButton from '@/components/ui/PillButton';
import { useState } from 'react';

export default function QuizCards({ questions = [] }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);

    const currentQuestion = questions[currentIndex];

    function handleSelect(option) {
        setSelectedAnswer(option);
    }

    function handleNext() {
        if (selectedAnswer === null) return;

        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = selectedAnswer;

        setAnswers(updatedAnswers);
        setSelectedAnswer(null);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            console.log("Quiz complete", updatedAnswers);
        }
    }

    if (!questions.length) {
        return (
            <div className="text-center text-gray-500">
                No quiz questions available
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