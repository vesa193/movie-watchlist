import { RouterPaths } from '@mw/router/routerPaths';
import { Drawer } from '@mw/ui-components/navigation/Drawer';
import { Navigation } from '@mw/ui-components/navigation/Navigation';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

export const RootLayout = () => {
    const { pathname } = useLocation();
    const isRootPath = pathname === RouterPaths.Root;

    return (
        <div className={clsx('grid', 'grid-cols-[auto_1fr]', 'h-screen')}>
            <Drawer />
            <main className="p-6">
                {isRootPath && <Navigation />}
                <Outlet />
            </main>
        </div>
    );
};
