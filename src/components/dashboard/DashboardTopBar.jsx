export default function DashboardTopBar({ user, onOpenSidebar }) {

    // Greet user based on time
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Set user icon to users initial
    const initial = user.name[0].toUpperCase();
    
    return (
        <header className='
            sticky top-0 z-10
            flex items-center gap-3
            px-5 sm:px-8 h-[77px]
            bg-[var(--background-secondary)]/90
            border-b border-[var(--slate-blue)]/20
        '>

            {/* -- Hamburger —-
                Mobile sidebar, hidden on lg+ otherwise the sidebar is always visible */}
            <button
                onClick={onOpenSidebar}
                className='
                    lg:hidden shrink-0
                    w-9 h-9 rounded-lg
                    flex items-center justify-center
                    text-[var(--text-color)] hover:bg-[#7067cf]/10
                    transition-colors
                '
                aria-label='Open sidebar'
            >
                {/* Three-line hamburger icon */}
                <svg width='18' height='14' viewBox='0 0 18 14' fill='none' aria-hidden='true'>
                    <rect width='18' height='2' rx='1' fill='currentColor'/>
                    <rect y='6'  width='12' height='2' rx='1' fill='currentColor'/>
                    <rect y='12' width='18' height='2' rx='1' fill='currentColor'/>
                </svg>
            </button>

            {/* -- Message -- */}
            <div className='flex-1 min-w-0'>

                {/* Greeting */}
                <h2 className='text-[15px] font-bold text-[var(--text-color)] truncate'>
                    {greeting}, {user.name}
                </h2>

                {/* Subtitle */}
                <p className='text-[12px] text-[var(--text-color)] mt-0.5'>
                    Ready to test your knowledge?
                </p>

            </div>

            {/* User avatar circle */}
            <div className='
                w-9 h-9 rounded-full shrink-0
                bg-[var(--dash-icon)]
                flex items-center justify-center
                text-[14px] font-bold text-[var(--white)]
            '>
                {initial}
            </div>

        </header>
    );
}