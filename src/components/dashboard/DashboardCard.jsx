'use client';

import AnimatedBorder from '@/components/ui/AnimatedBoarder';

export default function DashboardCard({ 
  title, 
  subtitle, 
  number, 
  img, 
  onClick, 
  variant = 'one' }) {

  // --- Base styles ---
const base =
  'relative group overflow-hidden rounded-xl flex flex-col items-center justify-center p-6 shadow-md transition-transform';

  // --- Variants ---
  const variants = {
    one: 'bg-[var(--card-one)] text-[var(--card-text)]',
    two: 'bg-[var(--card-two)] text-[var(--card-text)]',
    three: 'bg-[var(--card-three)] text-[var(--white)]',
    four: '[var(--card-four)] text-[var(--white)]'
  };

  const clickable = onClick
    ? 'cursor-pointer hover:scale-[1.02]'
    : '';

  return (
    <div
      className={`${base} ${variants[variant]} ${clickable}`}
      onClick={onClick}
    >

      {/* -- Boarder animation -- */}
      {onClick && <AnimatedBorder />}

      {img && <img src={img} alt={title} className='w-12 h-12 mb-3' />}
      <h2 className='text-[1.1em] font-bold'>{title}</h2>

      {subtitle && <p className='text-sm opacity-65'>{subtitle}</p>}

      {number !== undefined && (
        <span className='mt-4 text-[2em] font-bold'>{number}</span>
      )}
    </div>
  );
}