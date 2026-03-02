import Hero from '@/components/sections/Hero';
import FAQPage from '@/components/sections/Faq';
import UseLrnrPageCards from '@/components/sections/Cards';

export default function Home() {
  return (
    <div className='flex flex-col w-screen min-h-screen items-center justify-start'>
      <Hero />
      <FAQPage />
    </div>
  );
}
