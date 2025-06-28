import mwLogo from '@mw/assets/large.png';
import { RouterPaths } from '@mw/router/routerPaths';
import clsx from 'clsx';
import { useState, useTransition } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';

export const Drawer = () => {
    const { pathname } = useLocation();
    const [_isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className={clsx(
                'bg-gray-50',
                'p-4',
                { 'w-[max-content]': !isOpen },
                { 'w-[200px]': isOpen },
                'h-[100%]',
            )}
        >
            <div className={clsx('sticky', 'top-0')}>
                <span
                    className="flex justify-end font-bold text-zinc-950 cursor-pointer text-2xl m-5"
                    onClick={() => startTransition(() => setIsOpen(!isOpen))}
                >
                    {isOpen ? <BsArrowLeft /> : <BsArrowRight />}
                </span>
                <NavLink
                    to={RouterPaths.Root}
                    className={clsx({
                        'pointer-events-none': pathname === RouterPaths.Root,
                    })}
                >
                    <img
                        src={mwLogo}
                        alt="Movie Watchlist Logo"
                        width={80}
                        draggable={false}
                    />
                </NavLink>

                <ul
                    className={clsx(
                        'flex',
                        'flex-col',
                        'gap-4',
                        'mt-4',
                        'text-sm',
                        'text-zinc-950',
                    )}
                >
                    <NavLink to={RouterPaths.Favorites}>
                        <li>Favorites</li>
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
};
