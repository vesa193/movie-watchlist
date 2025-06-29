import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { useMovie } from '@mw/features/movie/hooks/useMovie';
import { MovieDetails } from '@mw/features/movie/MovieDetails';
import { useForm } from '@mw/hooks/useForm';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextAreaField } from '@mw/ui-components/form-fields/TextAreaField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const { movieId } = useParams();
    const movie = useMovie(movies, Number(movieId));
    const { formData, error, handleOnChange, handleReset } = useForm<
        Partial<Movie>
    >({
        title: movie?.title,
        genre: movie?.genre,
        status: movie?.status,
        synopsis: movie?.synopsis,
        poster: movie?.poster,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dialog = useRef<HTMLDialogElement | null>(null);
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
            <dialog
                ref={dialog}
                open={isDeleting}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/50 backdrop:backdrop-blur-md"
            >
                <div className="flex flex-col gap-4 p-10 border-1 sha">
                    <p className="text-lg">
                        Are you sure you want to delete this movie?
                    </p>
                    <div className="flex gap-4">
                        <Button
                            color="tertiary"
                            onClick={() => setIsDeleting(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="delete"
                            onClick={() => setIsDeleting(false)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
export default MovieDetailsPage;
