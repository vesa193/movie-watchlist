import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import type React from 'react';

type MovieFilterFieldsProps = {
    movies: Movie[];
    searchParams: URLSearchParams;
    setSearchParams: (_params: URLSearchParams) => void;
    setFilteredMovies: (_movies: Movie[]) => void;
    filters: {
        title: string;
        status: string;
    };
    setFilters: (_filters: { title: string; status: string }) => void;
    handleSearch: (_e: React.FormEvent<HTMLFormElement>) => void;
};

export const MovieFilterFields = ({
    filters,
    setFilters,
    searchParams,
    setSearchParams,
    setFilteredMovies,
    movies,
    handleSearch,
}: MovieFilterFieldsProps) => (
    <form
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] items-end gap-4"
        onSubmit={handleSearch}
    >
        <TextField
            name="title"
            label="Title"
            value={filters?.title || searchParams.get('title') || ''}
            onChange={(e) => {
                if (e.target.value === '') {
                    searchParams.delete('title');
                    setSearchParams(searchParams);
                }

                setFilters({ ...filters, title: e.target.value });
            }}
            placeholder='eg. "The Matrix"'
        />
        <SelectField
            name="status"
            label="Status"
            value={filters?.status || searchParams.get('status') || ''}
            onChange={(e) =>
                setFilters({ ...filters, status: e.target?.value })
            }
        >
            <option value="all">All</option>
            <option value="watched">Watched</option>
            <option value="planned">Planned</option>
        </SelectField>
        <div className="flex gap-4">
            <Button
                color="tertiary"
                onClick={() => {
                    searchParams.delete('title');
                    searchParams.delete('status');
                    setSearchParams(searchParams);
                    setFilters({ title: '', status: 'all' });
                    setFilteredMovies(movies);
                }}
            >
                Clear
            </Button>
            <Button type="submit" onClick={() => {}}>
                Search
            </Button>
        </div>
    </form>
);
