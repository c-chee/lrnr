import { Work_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

// ===  Components ===
import Navbar from '@/components/layout/Navbar';
<<<<<<< HEAD
import Footer from '@/components/layout/Footer';
=======
// import Footer from '@/components/layout/Footer';
>>>>>>> 3b3abc9 (Navigations (#3))

// === Fonts === 
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-work',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-cormorant',
})

export const metadata = {
  title: 'LRNR',
  description: 'Custom Quizes powered by AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
<<<<<<< HEAD
      <body className={`${workSans.className} antialiased flex flex-col max-w-screen min-h-screen`}>
=======
      <body className={`${workSans.className} antialiased flex flex-col max-w-screen-lg min-h-screen`}>
>>>>>>> 3b3abc9 (Navigations (#3))

        <Navbar />

        <main className='flex flex-col pt-[6em]'>
          {children}
        </main>

<<<<<<< HEAD
        <Footer />
=======
        {/* <Footer /> */}
>>>>>>> 3b3abc9 (Navigations (#3))
        
      </body>
    </html>
  );
}
