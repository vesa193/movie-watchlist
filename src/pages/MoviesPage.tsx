import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies } from '@mw/hooks/useMovies';

const MoviesPage = () => {
    const { movies, isLoading } = useMovies();
    console.log('movies', movies);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    {...movie}
                    onLike={(movieId) => console.log('movieId', movieId)}
                />
            ))}
        </div>
    );
};
export default MoviesPage;
