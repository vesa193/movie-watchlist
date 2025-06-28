import clsx from 'clsx';
import type React from 'react';
import type { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset' | undefined;
    color?: 'primary' | 'secondary' | 'tertiary' | 'edit' | 'delete';
    onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    form?: string;
};

export const Button = ({
    children,
    type = 'button',
    color = 'primary',
    isDisabled = false,
    form,
    onClick,
}: ButtonProps) => {
    const buttonColors = [
        { 'bg-blue-500': color === 'primary' },
        { 'hover:bg-blue-700': color === 'primary' },
        { 'border-blue-700': color === 'primary' },

        { 'bg-green-500': color === 'secondary' },
        { 'hover:bg-green-700': color === 'secondary' },
        { 'border-green-700': color === 'secondary' },

        { 'bg-gray-500': color === 'tertiary' },
        { 'hover:bg-gray-700': color === 'tertiary' },
        { 'border-gray-700': color === 'tertiary' },

        { 'bg-yellow-500': color === 'edit' },
        { 'hover:bg-yellow-700': color === 'edit' },
        { 'border-yellow-700': color === 'edit' },

        { 'bg-red-500': color === 'delete' },
        { 'hover:bg-red-700': color === 'delete' },
        { 'border-red-700': color === 'delete' },
    ];

    return (
        <button
            disabled={isDisabled}
            type={type}
            {...(form && { form })}
            className={clsx(
                ...buttonColors,
                'text-white',
                'font-bold',
                'py-2',
                'px-4',
                'border',
                'cursor-pointer',
                'rounded',
                { 'opacity-50': isDisabled },
                { 'pointer-events-none': isDisabled },
                { 'bg-gray-400': isDisabled },
            )}
            onClick={(event: MouseEvent<HTMLButtonElement>) => onClick(event)}
        >
            {children}
        </button>
    );
};
