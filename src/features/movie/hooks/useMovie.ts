import { useMovies, type Movie } from '@mw/hooks/useMovies';

export const useMovie = (movieId: number) => {
    const { movies } = useMovies();

    const movie = movies.find((movieItem: Movie) => movieItem.id === movieId);

    return movie;
};
