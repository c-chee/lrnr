'use client';

import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const useCases = [
  {
    title: 'Study for classes',
    description:
      'Generate quizzes for course material, test prep, and review sessions.',
    bg: 'bg-[#6B83FF]',
  },
  {
    title: 'Practice new topics',
    description:
      'Build quizzes around unfamiliar subjects and learn at your own pace.',
    bg: 'bg-(--periwinkle)',
  },
  {
    title: 'Prepare for exams',
    description:
      'Reinforce important concepts with personalized practice questions.',
    bg: 'bg-[#B2B9E8]',
  },
  {
    title: 'Track your progress',
    description:
      'Use repeated quiz practice to strengthen weak areas over time.',
    bg: 'bg-(--lavender-mist)',
  },
];

export default function UseCases() {
  return (
    <section className="w-full px-6 md:px-15 lg:px-18 py-12 md:py-16 lg:py-20 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className={`${cormorant.className} text-[42px] sm:text-[55px] md:text-[57px] lg:text-[65px] font-light text-[var(--text-color)] leading-tight`}
          >
            What should you use LRNR for?
          </h2>

          <p className="mt-4 text-[18px] sm:text-[20px] md:text-[24px] text-[var(--text-color)] opacity-70">
            Generate custom quizzes for studying, practice, and review.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {useCases.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} rounded-[24px] min-h-[220px] md:min-h-[250px] lg:min-h-[270px] p-6 md:p-8 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-[1.01]`}
            >
              <h3 className="text-[24px] md:text-[28px] font-semibold text-[#1f1f1f] mb-3">
                {item.title}
              </h3>

              <p className="text-[16px] md:text-[18px] text-[#1f1f1f] opacity-80 max-w-[28ch]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}