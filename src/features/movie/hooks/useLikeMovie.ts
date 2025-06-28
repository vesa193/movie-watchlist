import { useMovies, type Movie } from '@mw/hooks/useMovies';

export const useLikeMovie = () => {
    const { movies, setMovies } = useMovies();

    const handleOnLike = (movieID: number) => {
        const moviesList = [...movies];
        const movieItem = moviesList.find((mv: Movie) => mv.id === movieID);
        if (movieItem) {
            movieItem.liked = !movieItem?.liked;
        }

        console.log('movieLiked', movieID, movieItem?.liked);
        localStorage.setItem('movies', JSON.stringify(moviesList));
        window.location.reload();
        setMovies(moviesList);
    };

    return { handleOnLike };
};
