import { Work_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

// === Components ===
import LayoutShell from '@/components/layout/LayoutShell';

// === Fonts === 
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-work',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-cormorant',
});

export const metadata = {
  title: {
    default: 'LRNR',
    template: '%s | LRNR',
  },
  description: 'Custom Quizzes powered by AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${workSans.className} antialiased flex flex-col min-h-screen`}>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
