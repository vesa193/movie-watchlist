import type { Movie } from '@mw/types';
import { useCallback, useEffect, useState } from 'react';

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>(
        JSON.parse(localStorage.getItem('movies') || '[]') || [],
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMovies = useCallback(async () => {
        setIsLoading(true);
        fetch('../data/movies.json')
            .then((res) => res.json())
            .then((moviesList: Movie[]) => {
                localStorage.setItem('movies', JSON.stringify(moviesList));
                setMovies((prev) => [...prev, ...moviesList]);
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [setIsLoading, setError, setMovies]);

    useEffect(() => {
        if (movies?.length === 0) {
            getMovies();
        }
    }, [getMovies, movies?.length]);

    return {
        movies,
        isLoadingMovies: isLoading,
        error,
        setMovies,
    };
};
