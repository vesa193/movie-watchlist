import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies, type Movie } from '@mw/hooks/useMovies';
import { useState } from 'react';

const MoviesPage = () => {
    const { movies, isLoadingMovies, handleOnLike } = useMovies();
    // const handleOnLike = (movieId: number) => {
    //     const moviesList = [...movies];
    //     const movie = movies.find(
    //         (movieItem: Movie) => movieItem.id === movieId,
    //     );
    //     if (movie) {
    //         movie.liked = !movie?.liked;
    //     }

    //     console.log('movieLiked', movieId, movie?.liked);
    //     localStorage.removeItem('movies');
    //     localStorage.setItem('movies', JSON.stringify(moviesList));
    //     setMovies(moviesList);
    // };

    if (isLoadingMovies) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onLike={handleOnLike} />
            ))}
        </div>
    );
};
export default MoviesPage;
