import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { useMovie } from '@mw/features/movie/hooks/useMovie';
import { MovieDetails } from '@mw/features/movie/MovieDetails';
import { useMovies } from '@mw/hooks/useMovies';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const { movieId } = useParams();
    const movie = useMovie(movies, Number(movieId));

    if (!movieId || !movie) {
        return <p>Movie not found!</p>;
    }

    return (
        <div className="flex justify-center">
            <MovieDetails movie={movie} onLike={handleOnLike} />
        </div>
    );
};
export default MovieDetailsPage;
