'use client';

import { useState } from 'react';
import DropdownField from '@/components/ui/DropdownField';
import DropdownHistory from '@/components/ui/DropdownHistory';
import Button from '@/components/ui/PillButton';

export default function QuizForm({ user, history }) {

    const [form, setForm] = useState({
        topic: '',
        level: '',
        count: '',
        style: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));

        // Remove error when user fixes field
        setErrors(prev => ({
            ...prev,
            [name]: '',
        }));
    }

    function validateForm() {
        let newErrors = {};

        if (!form.topic.trim()) {
            newErrors.topic = 'Topic is required';
        }

        if (!form.level) {
            newErrors.level = 'Expertise level is required';
        }

        if (!form.count) {
            newErrors.count = 'Number of questions is required';
        }

        if (!form.style.trim()) {
            newErrors.style = 'Question style is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        console.log('Valid form:', form);

        /** ********************
         * OPEN ROUTER API
        ************************ */
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full max-w-md p-4 items-center'
        >

            {/* Topic */}
            <DropdownHistory
                label='Topic'
                name='topic'
                value={form.topic}
                onChange={handleChange}
                history={user ? history?.topics : []}
                placeholder='Enter a topic...'
                required
                error={errors.topic}
            />

            {/* Expertise */}
            <DropdownField
                label='Expertise Level'
                name='level'
                value={form.level}
                onChange={handleChange}
                required
                error={errors.level}
                options={[
                    { value: 'novice', label: 'Novice' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'expert', label: 'Expert' },
                ]}
            />

            {/* Number of Questions */}
            <DropdownField
                label='Number of Questions'
                name='count'
                value={form.count}
                onChange={handleChange}
                required
                error={errors.count}
                options={Array.from({ length: 20 }, (_, i) => ({
                    value: i + 1,
                    label: i + 1,
                }))}
            />

            {/* Style */}
            <DropdownHistory
                label='Question Style'
                name='style'
                value={form.style}
                onChange={handleChange}
                history={user ? history?.styles : []}
                placeholder='e.g. Normal, Like a teacher...'
                required
                error={errors.style}
            />

            {/* Submit */}
            <Button
                type='submit'
                className='max-w-[10em] place-items-center'
                variant='secondary'
            >
                Create Quiz
            </Button>

        </form>
    );
}