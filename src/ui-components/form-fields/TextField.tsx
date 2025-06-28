import type React from 'react';

type TextFieldProps = {
    label: string;
    type?: 'text' | 'password' | 'email' | 'number';
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
    label,
    type = 'text',
    ...props
}: TextFieldProps) => (
    <div>
        <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={label}
        >
            {label}
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            id={label}
            type={type}
            {...props}
        />
    </div>
);
