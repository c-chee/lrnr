'use client';

import { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/PillButton';

export default function SignupForm() {

    // === States ===
    // Form input values
    const [form, setForm] = useState({
        fname: '', // First name
        lname: '', // Last name
        email: '',
        password: '',
    });

    // Stores validation errors
    const [errors, setErrors] = useState({});

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        // Update only the changed field
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing again
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    }

    // === Handler ==
    // For signup form to create a user
    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!form.fname) newErrors.fname = 'First name is required';
        if (!form.lname) newErrors.lname = 'Last name is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (form.password.length < 8)
        newErrors.password = 'Minimum 8 characters';

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }

        /** **************************
         *  SIGNUP API
        ****************************** */
        // console.log('Submitting signup:', form);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                username: `${form.fname} ${form.lname}`,
                email: form.email,
                password: form.password,
                }),
                cache: 'no-store',
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                console.error('Expected JSON, got:', text);
                setErrors({ general: 'Unexpected server response' });
                return;
            }

            if (!res.ok) {
                setErrors({ general: data.message || 'Signup failed' });
                return;
            }

            console.log('Signup success:', data);
            window.location.href = '/login';
        } catch (err) {
            console.error(err);
            setErrors({ general: 'Something went wrong' });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full max-w-md p-4 items-center'
        >

            <InputField
                label='First Name'
                name='fname'
                placeholder='John'
                value={form.fname}
                onChange={handleChange}
                error={errors.fname}
                required
            />

            <InputField
                label='Last Name'
                name='lname'
                placeholder='Doe'
                value={form.lname}
                onChange={handleChange}
                error={errors.lname}
                required
            />

            <InputField
                label='Email'
                name='email'
                type='email'
                placeholder='example@email.com'
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
            />

            <InputField
                label='Password'
                name='password'
                type='password'
                placeholder='Minimum 8 characters'
                helperText='Minimum 8 characters'
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                required
            />

            <Button 
                type='submit' 
                className='max-w-[15em]'
                variant='secondary'
            >
                Create Account
            </Button>
        </form>
    );
}