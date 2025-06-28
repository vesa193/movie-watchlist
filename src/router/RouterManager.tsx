import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterPaths } from '@mw/router/routerPaths';
import { RootLayout } from '@mw/conatiner/RootLayout';
import MovieDetails from '@mw/pages/MovieDetailsPage';
import MoviesPage from '@mw/pages/MoviesPage';
import AddMoviePage from '@mw/pages/AddMoviePage';
import ErrorPage from '@mw/pages/ErrorPage';
import FavoritesPage from '@mw/pages/FavoritesPage';

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
                {
                    path: RouterPaths.Favorites,
                    element: <FavoritesPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};
