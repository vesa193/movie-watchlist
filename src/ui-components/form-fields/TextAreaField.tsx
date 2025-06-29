import type React from 'react';

export const TextAreaField = ({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
}: {
    id?: string;
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
    <div className="flex flex-col">
        <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={id}
        >
            {label}
        </label>
        <textarea
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);
