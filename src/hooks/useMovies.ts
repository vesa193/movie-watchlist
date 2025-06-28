import { useCallback, useEffect, useState } from 'react';

export type Movie = {
    id: number;
    title: string;
    genre: string;
    status: string;
    year?: number;
    poster: string;
    rating: number;
    runtime?: number;
    liked: boolean;
    synopsis?: string;
};

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

    const handleOnLike = (movieId: number) => {
        const moviesList = [...movies];
        const movie = movies.find(
            (movieItem: Movie) => movieItem.id === movieId,
        );
        if (movie) {
            movie.liked = !movie?.liked;
        }

        console.log('movieLiked', movieId, movie?.liked);
        localStorage.removeItem('movies');
        localStorage.setItem('movies', JSON.stringify(moviesList));
        setMovies(moviesList);
    };

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
        handleOnLike,
    };
};
