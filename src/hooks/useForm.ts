import React, { useState } from 'react';

export const useForm = <T>(intialValues: Partial<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(intialValues);
    const [error, setError] = useState<Partial<T>>({});

    const validate = (name: string, value: string) => {
        const errorObj: Record<string, string> = {};
        if (name === 'title') {
            if (value.length === 0) {
                errorObj.title = 'Title is required';
            }

            if (value.length < 3) {
                errorObj.title = 'Title is too short';
            }
        }

        if (name === 'genre') {
            if (value.length === 0) {
                errorObj.genre = 'Genre is required';
            }
        }

        return errorObj;
    };

    const handleOnChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setError({});
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        setFormData(intialValues);
    };

    return { formData, error, setError, handleOnChange, handleReset, validate };
};
