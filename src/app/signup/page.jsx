import PageTitle from "@/components/ui/PageTitle";
import SignupForm from "@/components/forms/SignupForm";

export const metadata = {
    title: 'Sign Up',
};

export default function signup() {
    return (
        <div className='flex flex-col w-screen min-h-screen items-center justify-start'>
            <PageTitle>Signup</PageTitle>
            <SignupForm />
        </div>
    )
}