import { useForm } from '@mw/hooks/useForm';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { ToastBox } from '@mw/ui-components/dialog/ToastBox';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextAreaField } from '@mw/ui-components/form-fields/TextAreaField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import React from 'react';

const AddMoviePage = () => {
    const { movies, setMovies } = useMovies();
    const { formData, error, handleOnChange, handleReset } = useForm<Movie>({
        id: 0,
        title: '',
        genre: 'Action',
        status: 'Planned',
        year: 1900,
        poster: '',
        rating: 1,
        runtime: 100,
        liked: false,
        synopsis: '',
    });
    const [isCreated, setIsCreated] = React.useState(false);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const createdMovie: Movie = {
            ...formData,
            id: Date.now(),
            title: formData.title ?? '',
            genre: formData.genre ?? 'Action',
            status: formData.status ?? 'Planned',
            poster: formData.poster ?? '',
            rating: formData.rating ?? 0,
            runtime: formData.runtime ?? 0,
            liked: formData.liked ?? false,
            synopsis: formData.synopsis ?? '',
        };

        if (!formData.title || !formData.genre) {
            return;
        }

        const updatedMovies = [...movies, createdMovie];
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
        handleReset();
        setIsCreated(true);
    };

    return (
        <>
            {isCreated && (
                <ToastBox
                    variant="success"
                    isOpen={isCreated}
                    onClose={() => setIsCreated(false)}
                >
                    <p>Movie is successfully created!</p>
                </ToastBox>
            )}
            <div className="flex justify-center flex-1">
                <form
                    id="movie-form"
                    className="max-w-[500px] flex-1 mt-20 grid gap-4 border-1 border-gray-200 p-6"
                    onSubmit={handleOnSubmit}
                >
                    <TextField
                        name="title"
                        label="Title*"
                        value={formData.title}
                        onChange={handleOnChange}
                        placeholder="eg. The Shawshank Redemption"
                        helperText={error.title}
                    />
                    <SelectField
                        name="genre"
                        label="Genre*"
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
                        placeholder='eg. "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."'
                    />
                    <TextField
                        name="poster"
                        label="Poster"
                        value={formData.poster}
                        onChange={handleOnChange}
                        placeholder='eg. "https://example.com/poster.jpg"'
                    />
                    <TextField
                        type="number"
                        name="year"
                        label="Year"
                        min="1900"
                        max="2099"
                        step="1"
                        value={formData.year}
                        onChange={handleOnChange}
                        placeholder="eg. 1994"
                    />
                    <TextField
                        type="number"
                        name="runtime"
                        label="Runtime"
                        min="0"
                        max="300"
                        step="5"
                        value={formData.runtime}
                        onChange={handleOnChange}
                        placeholder="eg. 165"
                    />
                    <TextField
                        type="number"
                        name="rating"
                        label="Rating"
                        min="0"
                        max="5"
                        step=".1"
                        value={formData.rating}
                        onChange={handleOnChange}
                        placeholder="eg. 3.5"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            color="tertiary"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {}}
                            isDisabled={!formData.title || !formData.genre}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default AddMoviePage;
