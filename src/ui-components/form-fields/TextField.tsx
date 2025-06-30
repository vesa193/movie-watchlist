import type React from 'react';

type TextFieldProps = {
    label: string;
    type?: 'text' | 'password' | 'email' | 'number';
    helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
    label,
    type = 'text',
    helperText,
    ...props
}: TextFieldProps) => (
    <div>
        <label
            className="block text-gray-700 dark:text-gray-50 text-sm font-bold mb-2"
            htmlFor={label}
        >
            {label}
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white focus:border-blue-500 dark:bg-gray-700 dark:text-gray-50"
            id={label}
            type={type}
            {...props}
        />
        {helperText && (
            <p className="text-red-600 text-sm mt-1">{helperText}</p>
        )}
    </div>
);
