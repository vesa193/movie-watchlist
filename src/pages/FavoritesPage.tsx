import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies } from '@mw/hooks/useMovies';

const FavoritesPage = () => {
    const { movies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {movies
                .filter((movie) => movie.liked)
                .map((movie) => (
                    <MovieCard
                        key={movie.id}
                        {...movie}
                        isLikeVisible={false}
                        onLike={handleOnLike}
                    />
                ))}
        </div>
    );
};
export default FavoritesPage;
