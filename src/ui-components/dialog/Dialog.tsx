import React from 'react';

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/45 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full z-10">
                {children}
            </div>
        </div>
    );
};
