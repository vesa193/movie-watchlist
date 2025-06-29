import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies } from '@mw/hooks/useMovies';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import type React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
    const { movies, isLoadingMovies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const [filteredMovies, setFilteredMovies] = useState(movies);

    const [filters, setFilters] = useState<{ title?: string; status?: string }>(
        {
            title: '',
            status: '',
        },
    );
    const [searchParams, setSearchParams] = useSearchParams(
        window.location.search,
    );

    const filteredMoviesList = movies.filter(
        (movie) =>
            (filters?.title ? movie.title.includes(filters.title) : true) &&
            (filters?.status !== 'all' && filters?.status === 'watched'
                ? movie.status === 'Watched'
                : movie.status === 'Planned'),
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams(filters);
        setFilteredMovies(filteredMoviesList);
    };

    if (isLoadingMovies) {
        return <div>Loading...</div>;
    }

    if (movies.length === 0) {
        return <div>No movies found</div>;
    }

    return (
        <>
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
                />
                <SelectField
                    name="status"
                    label="Status"
                    value={filters?.status || searchParams.get('status') || ''}
                    onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                    }
                >
                    <option value="all">All</option>
                    <option value="watched">Watched</option>
                    <option value="planned">Planned</option>
                </SelectField>
                <Button
                    color="tertiary"
                    onClick={() => {
                        setSearchParams({});
                        setFilters({});
                        setFilteredMovies(movies);
                    }}
                >
                    Clear
                </Button>
                <Button type="submit" onClick={() => {}}>
                    Search
                </Button>
            </form>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {(filteredMovies || movies)
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((movie) => (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            onLike={handleOnLike}
                        />
                    ))}
            </div>
        </>
    );
};
export default MoviesPage;
