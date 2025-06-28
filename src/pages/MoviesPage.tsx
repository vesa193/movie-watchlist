import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies } from '@mw/hooks/useMovies';

const MoviesPage = () => {
    const { movies, isLoadingMovies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);

    if (isLoadingMovies) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} onLike={handleOnLike} />
            ))}
        </div>
    );
};
export default MoviesPage;
