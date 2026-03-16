'use client';

import { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/PillButton';

export default function LoginForm() {

    // === States ===
    // To hold the values typed into form
    const [form, setForm] = useState({
        identifier: '', // username OR email
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
            general: '',
        }));
    }

    // === Handler ===
    // For login form submission
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent page reload

        const newErrors = {};

        // Frontend validation
        if (!form.identifier) newErrors.identifier = 'Username or Email is required';
        if (!form.password) newErrors.password = 'Password is required';

        // If errors exist, stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        /** **************************
         * LOGIN API
         ****************************** */
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: form.identifier,
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
                setErrors({ general: data.message || 'Login failed' });
                return;
            }

            console.log('Login success:', data);

            // Redirect to protected account page
            window.location.href = '/account?view=dashboard';

        } catch (err) {
            console.error('Login error:', err);
            setErrors({ general: 'Something went wrong' });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full max-w-md p-4 items-center'
        >

            {/* Username or Email Field */}
            <InputField
                label='Username or Email'
                name='identifier'
                type='text'
                placeholder='Enter username or email'
                value={form.identifier}
                onChange={handleChange}
                error={errors.identifier}
                required
            />

            {/* Password Field */}
            <InputField
                label='Password'
                name='password'
                type='password'
                placeholder='Enter your password'
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                required
            />

            {/* General Error Message */}
            {errors.general && (
                <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            <Button
                type='submit'
                className='max-w-[5em]'
                variant='secondary'
            >
                Login
            </Button>
        </form>
    );
}