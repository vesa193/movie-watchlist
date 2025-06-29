import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { useMovie } from '@mw/features/movie/hooks/useMovie';
import { MovieDetails } from '@mw/features/movie/MovieDetails';
import { useForm } from '@mw/hooks/useForm';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { Dialog } from '@mw/ui-components/dialog/Dialog';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextAreaField } from '@mw/ui-components/form-fields/TextAreaField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
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
        alert('Movie updated successfully');
    };

    const handleDeleteMovie = () => {
        const updatedMovies = movies.filter(
            (movieItem) => movieItem.id !== Number(movieId),
        );
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
        setIsDeleting(false);
        alert('Movie deleted successfully');
    };

    if (!movieId || !movie) {
        return <p>Movie not found!</p>;
    }

    return (
        <div className="grid justify-center">
            {!isEditing && <MovieDetails movie={movie} onLike={handleOnLike} />}
            {isEditing && (
                <form
                    id="movie-form"
                    className="min-w-[320px] mt-20 grid gap-4 border-1 border-gray-200 p-6"
                    onSubmit={handleOnSubmit}
                >
                    <TextField
                        name="title"
                        label="Title"
                        value={formData.title}
                        onChange={handleOnChange}
                        helperText={error.title}
                    />
                    <SelectField
                        name="genre"
                        label="Genre"
                        value={formData.genre}
                        onChange={handleOnChange}
                        helperText={error.genre}
                    >
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                    </SelectField>
                    <SelectField
                        name="status"
                        label="Status"
                        value={formData.status}
                        onChange={handleOnChange}
                    >
                        <option value="Watched">Watched</option>
                        <option value="Planned">Planned</option>
                    </SelectField>
                    <TextAreaField
                        name="synopsis"
                        label="Synopsis"
                        value={formData?.synopsis ?? ''}
                        onChange={handleOnChange}
                    />
                    <TextField
                        name="poster"
                        label="Poster"
                        value={formData.poster}
                        onChange={handleOnChange}
                    />
                </form>
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

            {isEditing && (
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        color="tertiary"
                        onClick={() => setIsEditing(false)}
                        isDisabled={!isEditing}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="movie-form"
                        color="primary"
                        onClick={() => {}}
                        isDisabled={!isEditing || isDisabledSave}
                    >
                        Save
                    </Button>
                </div>
            )}
            <Dialog isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
                <h4 className="mb-4">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold">{movie?.title}</span>
                    <br /> this movie?
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
