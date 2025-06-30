import clsx from 'clsx';
import React, { useState } from 'react';

export const ToastBox = ({
    children,
    isOpen,
    variant = 'success',
    onClose,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    variant?: 'success' | 'error';
    onClose?: () => void;
}) => {
    const [open, setOpen] = useState(isOpen || false);

    const handleClose = () => {
        onClose?.();
        setOpen(false);
    };

    return (
        <div
            className={clsx(
                'fixed',
                'bottom-4',
                'right-4',
                'w-80',
                'z-50',
                'p-4',
                'dark:bg-gray-800',
                'rounded-md',
                'shadow-md',
                {
                    'bg-green-600 dark:bg-green-600 text-white':
                        variant === 'success',
                },
                {
                    'bg-red-600 dark:bg-red-600 text-white':
                        variant === 'error',
                },
                { hidden: !open },
            )}
        >
            <button
                type="button"
                className="absolute top-2 right-2 text-2xl text-gray-50 hover:text-gray-200 cursor-pointer"
                onClick={handleClose}
            >
                &times;
            </button>
            {children}
        </div>
    );
};
