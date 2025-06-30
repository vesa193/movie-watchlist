import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { useMovie } from '@mw/features/movie/hooks/useMovie';
import { MovieDetails } from '@mw/features/movie/MovieDetails';
import { MovieEditForm } from '@mw/features/movie/MovieEditForm';
import { useForm } from '@mw/hooks/useForm';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { Dialog } from '@mw/ui-components/dialog/Dialog';
import { ToastBox } from '@mw/ui-components/dialog/ToastBox';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const { movieId } = useParams();
    const movie = useMovie(movies, Number(movieId));
    const { formData, error, handleOnChange } = useForm<Partial<Movie>>({
        title: movie?.title,
        genre: movie?.genre,
        status: movie?.status,
        synopsis: movie?.synopsis,
        poster: movie?.poster,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const isDisabledSave = !formData.title || !formData.genre;

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit', formData);
        const updatedMovies = movies.map((movieItem) =>
            movieItem.id === Number(movieId)
                ? {
                      ...movieItem,
                      ...formData,
                  }
                : movieItem,
        );

        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
        setIsEditing(false);
        setIsUpdated(true);
    };

    const handleDeleteMovie = () => {
        const updatedMovies = movies.filter(
            (movieItem) => movieItem.id !== Number(movieId),
        );
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
        setIsDeleting(false);
        setIsDeleted(true);
    };

    if (!movieId || !movie) {
        return (
            <>
                <p className="text-gray-500 dark:text-gray-50">
                    Movie not found!
                </p>
                {isDeleted && (
                    <ToastBox
                        isOpen={isDeleted}
                        variant="success"
                        onClose={() => setIsDeleted(false)}
                    >
                        {isDeleted && 'Movie deleted successfully!'}
                    </ToastBox>
                )}
            </>
        );
    }

    return (
        <div className="grid justify-center">
            {isUpdated && (
                <ToastBox
                    isOpen={isUpdated}
                    variant="success"
                    onClose={() => setIsUpdated(false)}
                >
                    {isUpdated && 'Movie updated successfully!'}
                </ToastBox>
            )}
            {!isEditing && <MovieDetails movie={movie} onLike={handleOnLike} />}
            {isEditing && (
                <MovieEditForm
                    handleOnSubmit={handleOnSubmit}
                    handleOnChange={handleOnChange}
                    formData={formData}
                    isSaveDisabled={!isEditing || isDisabledSave}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    error={error}
                />
            )}
            {!isEditing && (
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        color="secondary"
                        onClick={() => setIsEditing(true)}
                        isDisabled={isEditing}
                    >
                        Edit
                    </Button>
                    <Button
                        color="delete"
                        onClick={() => setIsDeleting(true)}
                        isDisabled={isDeleting}
                    >
                        Delete
                    </Button>
                </div>
            )}

            <Dialog isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
                <h4 className="mb-4 text-gray-900 dark:text-gray-50">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold">{movie?.title}</span> movie?
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        color="tertiary"
                        onClick={() => setIsDeleting(false)}
                    >
                        Cancel
                    </Button>
                    <Button color="delete" onClick={handleDeleteMovie}>
                        Delete
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};
export default MovieDetailsPage;
