import type { Movie } from '@mw/types';

export const useMovie = (movies: Movie[], movieId: number) => {
    const movie = movies.find((movieItem: Movie) => movieItem.id === movieId);

    return movie;
};
