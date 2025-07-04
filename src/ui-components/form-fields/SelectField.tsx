import type React from 'react';

type SelectFieldProps = {
    label: string;
    helperText?: string;
    children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectField = ({
    label,
    helperText,
    children,
    ...props
}: SelectFieldProps) => (
    <>
        <div>
            <label
                className="block text-gray-700 dark:text-gray-50 text-sm font-bold mb-2"
                htmlFor="grid-state"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    bg-white focus:border-blue-500 dark:bg-gray-700 dark:text-gray-50"
                    id="grid-state"
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
        {helperText && <p className="text-red-600 text-sm">{helperText}</p>}
    </>
);
