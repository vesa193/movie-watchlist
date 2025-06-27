import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
    <>
        <nav>Navigation</nav>
        <main>
            <Outlet />
        </main>
    </>
);
