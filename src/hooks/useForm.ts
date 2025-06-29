import type { Movie } from '@mw/types';
import React, { useState } from 'react';

export const useForm = <T>(intialValues: Partial<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(intialValues);
    const [error, setError] = useState<Partial<T>>({});

    const validate = (name: string, value: string) => {
        if (name === 'title') {
            if (value.length === 0) {
                setError((prev) => ({ ...prev, title: 'Title is required' }));
            }

            if (value.length < 3) {
                setError((prev) => ({ ...prev, title: 'Title is too short' }));
            }
        }

        if (name === 'genre') {
            if (value.length === 0) {
                setError((prev) => ({ ...prev, title: 'Genre is required' }));
            }
        }
    };

    const handleOnChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        setFormData(intialValues);
    };

    return { formData, error, handleOnChange, handleReset, validate };
};
