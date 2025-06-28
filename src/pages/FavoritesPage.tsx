import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies, type Movie } from '@mw/hooks/useMovies';

const FavoritesPage = () => {
    const { movies, setMovies } = useMovies();

    const handleOnLike = (movieId: number) => {
        const moviesList = [...movies];
        const movie = moviesList.find(
            (movieItem: Movie) => movieItem.id === movieId,
        );
        if (movie) {
            movie.liked = !movie?.liked;
        }

        console.log('movieLiked', movieId, movie?.liked);
        localStorage.setItem('movies', JSON.stringify(moviesList));
        setMovies(moviesList);
    };

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {movies
                .filter((movie) => movie.liked)
                .map((movie) => (
                    <MovieCard
                        key={movie.id}
                        {...movie}
                        onLike={handleOnLike}
                    />
                ))}
        </div>
    );
};
export default FavoritesPage;
