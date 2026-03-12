
export default function UserStrip({ user, quizCount }) {

    const initial = user.name[0].toUpperCase();

    return (
        <div className='px-4 py-4 border-t border-[var(--white)]/10 shrink-0'>
            <div className='flex items-center gap-3'>

                {/* Avatar — first initial of user's name */}
                <div className='w-8 h-8 rounded-full bg-[var(--dash-icon)] flex items-center justify-center text-[13px] font-bold text-[var(--white)] shrink-0'>
                    {initial}
                </div>

                <div className='min-w-0'>

                    {/* Display name — truncated if too long */}
                    <p className='text-[13px] font-bold text-[var(--white)] truncate'>
                        {user.name}
                    </p>

                    {/* Quiz count — pluralise if needed */}
                    <p className='text-[11px] text-[var(--white)]/40'>
                        {quizCount} quiz{quizCount !== 1 ? 'zes' : ''} taken
                    </p>
                </div>

            </div>
        </div>
    );
}