import { Drawer } from '@mw/ui-components/navigation/Drawer';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
    <div className={clsx('grid', 'grid-cols-[auto_1fr]', 'h-screen')}>
        <Drawer />
        <main>
            <Outlet />
        </main>
    </div>
);
