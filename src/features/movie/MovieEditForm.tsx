import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextAreaField } from '@mw/ui-components/form-fields/TextAreaField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import type React from 'react';

type MovieEditFormProps = {
    handleOnSubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
    handleOnChange: (
        _e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
    formData: Partial<Movie>;
    isSaveDisabled: boolean;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    error: Partial<Partial<Movie>>;
};

export const MovieEditForm = ({
    handleOnSubmit,
    handleOnChange,
    formData,
    error,
    isEditing,
    setIsEditing,
    isSaveDisabled,
}: MovieEditFormProps) => (
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
            placeholder="eg. The Matrix"
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
            placeholder='eg. "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"'
        />
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
                isDisabled={isSaveDisabled}
            >
                Save
            </Button>
        </div>
    </form>
);
