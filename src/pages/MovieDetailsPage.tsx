import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { useMovie } from '@mw/features/movie/hooks/useMovie';
import { MovieDetails } from '@mw/features/movie/MovieDetails';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import { useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const { movieId } = useParams();
    const movie = useMovie(movies, Number(movieId));
    const [formData, setFormData] = useState<Partial<Movie>>({
        title: movie?.title,
        genre: movie?.genre,
        status: movie?.status,
        synopsis: movie?.synopsis,
        poster: movie?.poster,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dialog = useRef<HTMLDialogElement | null>(null);

    if (!movieId || !movie) {
        return <p>Movie not found!</p>;
    }

    return (
        <div className="grid justify-center gap-5">
            {!isEditing && <MovieDetails movie={movie} onLike={handleOnLike} />}
            {isEditing && (
                <form
                    id="movie-form"
                    className="min-w-[320px] mt-20 grid gap-4 border-1 border-gray-200 p-6"
                    onSubmit={() => setIsEditing(false)}
                >
                    <TextField label="Title" value={formData.title} />
                    <TextField label="Genre" value={formData.genre} />
                    <TextField label="Status" value={formData.status} />
                    <TextField label="Synopsis" value={formData.synopsis} />
                    <TextField label="Poster" value={formData.poster} />
                    <SelectField label="Status">
                        <option value="Watched">Watched</option>
                        <option value="Planned">Planned</option>
                    </SelectField>
                    <SelectField label="Liked">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </SelectField>
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
                        isDisabled={!isEditing}
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
