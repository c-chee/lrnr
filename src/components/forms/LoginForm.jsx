'use client';

import { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/PillButtonHollow';

export default function LoginForm() {

    // === States ===
    // To hold the values typed into form
    const [form, setForm] = useState({
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

    // === Handler ===
    // For login form submission
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent page reload

        const newErrors = {};

        // Frontend validation
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';

        // If errors exist, stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        /** **************************
         * IMPORTANT: CALL LOGIN API
        ****************************** */
        console.log('Submitting login:', form);
    }

    return (
        <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 w-full max-w-md'
        >

            {/* Email Field */}
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

            <Button type='submit'>
                Login
            </Button>
        </form>
    );
}