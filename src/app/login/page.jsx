import PageTitle from '@/components/ui/PageTitle';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
    title: 'Login',
};

export default function login() {
    return (
        <div className='flex flex-col w-screen min-h-screen items-center justify-start'>
            <PageTitle>Login</PageTitle>
            <LoginForm />
        </div>
    )
}