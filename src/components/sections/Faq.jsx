"use client";

import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const FAQS = [
  {
    q: "Does this service cost money?",
    a: "LRNR has a free tier. If you choose premium features later (like saving unlimited quizzes or advanced difficulty settings), you’ll see pricing clearly before you pay.",
  },
  {
    q: "How does LRNR work?",
    a: "You tell LRNR what you’re learning (topic, level, and preferences). It generates questions and answers, then adapts future quizzes based on how you perform.",
  },
  {
    q: "Why should I make an account?",
    a: "An account lets you save your quizzes, track your progress, and pick up right where you left off on any device.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-20">
      <div className="mx-auto w-full max-w-4xl">
        {/* Title */}
        <h1
          className={[
            cormorant.className,
            "text-center text-4xl md:text-6xl font-light tracking-tight",
            "text-[var(--text-color)]",
          ].join(" ")}
        >
          Frequently asked questions
        </h1>

        {/* FAQ List */}
        <div className="mt-14 space-y-8">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={item.q} className="group">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl md:text-2xl text-[var(--text-color)]/60 group-hover:text-[var(--highlight)] transition">
                    {item.q}
                  </span>

                  <span className="ml-6 text-3xl md:text-4xl font-light text-[var(--text-color)]/60 group-hover:text-[var(--highlight)] transition">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={[
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-40 mt-3" : "max-h-0",
                  ].join(" ")}
                >
                  <p className="text-base md:text-lg text-[var(--text-color)]/45 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}