// === Components ===
import AccountNavbar from '@/components/layout/AccountNavbar';
import Footer from '@/components/layout/Footer';

// === Metadata ===
export const metadata = {
    title: 'LRNR Account Home',
    description: 'Custom Quizzes powered by AI',
}

export default function AccountLayout({ children }) {
    return (
        <>
            <AccountNavbar />

            <main className="flex-1 flex flex-col pt-[6em] min-h-screen">
                {children}
            </main>

            {/* <Footer type='account' /> */}
        </>
    );
}