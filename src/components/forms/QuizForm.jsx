'use client';

import { useState } from 'react';
import DropdownField from '@/components/ui/DropdownField';
import DropdownHistory from '@/components/ui/DropdownHistory';
import Button from '@/components/ui/PillButton';

export default function QuizForm({ user, history, formValues, onFormChange, onFormSubmit }) {

    // === States ===
    /**
     * Internal state
     * Used when this component manages its own state (no 'formValues' prop)
     * Empty fields
     */
    const [internalForm, setInternalForm] = useState({
        topic: '',
        level: '',
        count: '',
        style: '',
    });

    /**
     * Controlled state
     * This state is ignored, the parent owns the values
     * If 'formValues' and 'onFormChange' are provided from dashboard, use them. Otherwise fall back to internal state
     * Resolves/ decides which values to use
     */
    const isControlled = formValues !== undefined && onFormChange !== undefined;
    const form = isControlled ? formValues : internalForm;

    /**
     * Validation State
     */
    const [errors, setErrors] = useState({});


    // === Handlers ===
    /**
     * Handles changes from any field (input or select)
     * Updates to the appropriate state (controlled or internal) and clears the error for that field.
     */
    function handleChange(e) {

        const { name, value } = e.target;
        const updated = { ...form, [name]: value };

        if (isControlled) {
            // Controlled state
            // Tell the parent (DashboardPage) about the change
            // DashboardPage will update 'formValues' and clear the active sidebar card
            onFormChange(updated);
        } 
        else {
            // Update internal state
            setInternalForm(updated); 
        }

        // Clear the validation error for this field as the user fixes it
        setErrors(prev => ({ ...prev, [name]: '' }));
    }

    /**
     * Validates all four required fields
     * Populates error state with messages for any missing fields
     * Returns true if the form is valid and can be submitted
     */
    function validateForm() {
        const newErrors = {};

        if (!form.topic.trim()) newErrors.topic = 'Topic is required';
        if (!form.level)        newErrors.level = 'Expertise level is required';
        if (!form.count)        newErrors.count = 'Number of questions is required';
        if (!form.style.trim()) newErrors.style = 'Question style is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    /**
     * Handles form submission
     * Validates fields, then passes the values to the API call
     */
    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        if (onFormSubmit) {
            onFormSubmit(form);
        }

        console.log('Valid form:', form);

        /** ********************
         * AI API
        ************************ */
    }

    // Display
    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full max-w-md p-4 items-center'
        >

            {/* -- Topic --
                DropdownHistory shows last 5 past topics when user is logged in.
                Falls back to a plain text input when history is empty or if user is null (not signed in). */}
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

            {/* -- Expertise Level -— */}
            <DropdownField
                label='Expertise Level'
                name='level'
                value={form.level}
                onChange={handleChange}
                required
                error={errors.level}
                options={[
                    { value: 'Novice',       label: 'Novice' },
                    { value: 'Intermediate', label: 'Intermediate' },
                    { value: 'Expert',       label: 'Expert' },
                ]}
            />

            {/* -- Number of Questions —-
                Generates options 1 – 20 */}
            <DropdownField
                label='Number of Questions'
                name='count'
                value={form.count}
                onChange={handleChange}
                required
                error={errors.count}
                options={Array.from({ length: 20 }, (_, i) => ({
                    value: String(i + 1), // stored as string to match select element behaviour
                    label: i + 1,
                }))}
            />

            {/* -- Question Style --
                Dropdown shows last 5 past styles when user was logged in. */}
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

            {/* -- Submit -- 
                Create Quiz ... */}
            <Button
                type='submit'
                className='max-w-[10em] place-items-center'
                variant='tertiary'
            >
                Create Quiz
            </Button>

        </form>
    );
}