import mwLogo from '@mw/assets/large.png';
import ThemeToggle from '@mw/features/common/ThemeToggle';
import { RouterPaths } from '@mw/router/routerPaths';
import clsx from 'clsx';
import { BsArrowLeft } from 'react-icons/bs';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Drawer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isBackButtonVisible = pathname !== RouterPaths.Root;

    return (
        <nav
            className={clsx(
                'flex',
                'flex-col',
                'bg-gray-50',
                'dark:bg-gray-700',
                'p-4',
                'h-[100%]',
            )}
        >
            <div className={clsx('sticky', 'top-0')}>
                <span
                    className="flex justify-end font-bold text-zinc-950 dark:text-gray-50 cursor-pointer m-5"
                    onClick={() => navigate(-1)}
                >
                    <div className="flex gap-2">
                        {isBackButtonVisible && (
                            <>
                                <BsArrowLeft className={clsx('text-2xl')} />
                                <p>Back</p>
                            </>
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
                        'dark:text-gray-50',
                        'mb-10',
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
                <ThemeToggle />
            </div>
        </nav>
    );
};
