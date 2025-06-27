import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterPaths } from '@mw/router/routerPaths';
import { RootLayout } from '@mw/conatiner/RootLayout';
import MovieDetails from '@mw/pages/MovieDetailsPage';
import MoviesPage from '@mw/pages/MoviesPage';
import AddMoviePage from '@mw/pages/AddMoviePage';
import ErrorPage from '@mw/pages/ErrorPage';

export const RouterManager = () => {
    const router = createBrowserRouter([
        {
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: RouterPaths.Root,
                    element: <MoviesPage />,
                },
                {
                    path: RouterPaths.MovieDetails,
                    element: <MovieDetails />,
                },
                {
                    path: RouterPaths.AddMovie,
                    element: <AddMoviePage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};
