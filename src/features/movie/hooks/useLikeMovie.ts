import type { Movie } from '@mw/types';
import { useCallback } from 'react';

export const useLikeMovie = (
    movies: Movie[],
    setMovies: (_movies: Movie[]) => void,
) => {
    const handleOnLike = useCallback(
        (movieId: number) => {
            const updatedMovies = movies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, liked: !movie.liked }
                    : movie,
            );

            localStorage.setItem('movies', JSON.stringify(updatedMovies));
            setMovies(updatedMovies);
        },
        [movies, setMovies],
    );

    return { handleOnLike };
};
