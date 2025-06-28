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
                'flex',
                'flex-col',
                'bg-gray-50',
                'p-4',
                { 'w-[130px]': !isOpen },
                { 'w-[200px]': isOpen },
                'h-[100%]',
            )}
        >
            <div className={clsx('sticky', 'top-0')}>
                <span
                    className="flex justify-end font-bold text-zinc-950 cursor-pointer m-5"
                    onClick={() => startTransition(() => setIsOpen(!isOpen))}
                >
                    <div className="flex gap-2">
                        {isOpen && <BsArrowLeft className={clsx('text-2xl')} />}
                        <p>{isOpen ? 'Close' : 'Open'}</p>
                        {!isOpen && (
                            <BsArrowRight className={clsx('text-2xl')} />
                        )}
                    </div>
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
                        width={100}
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
                    <NavLink to={RouterPaths.Root}>
                        <li
                            className={clsx(
                                { 'font-bold': pathname === RouterPaths.Root },
                                'cursor-pointer',
                            )}
                        >
                            Home
                        </li>
                    </NavLink>
                    <NavLink to={RouterPaths.Favorites}>
                        <li
                            className={clsx(
                                {
                                    'font-bold':
                                        pathname === RouterPaths.Favorites,
                                },
                                'cursor-pointer',
                            )}
                        >
                            Favorites
                        </li>
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
};
