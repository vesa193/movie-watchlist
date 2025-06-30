import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { MovieCard } from '@mw/features/movie/MovieCard';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
import { Button } from '@mw/ui-components/buttons/Button';
import { SelectField } from '@mw/ui-components/form-fields/SelectField';
import { TextField } from '@mw/ui-components/form-fields/TextField';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
    const { movies, isLoadingMovies, setMovies } = useMovies();
    const { handleOnLike } = useLikeMovie(movies, setMovies);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchParams, setSearchParams] = useSearchParams(
        window.location.search,
    );
    const [filters, setFilters] = useState<{ title?: string; status?: string }>(
        {
            title: searchParams.get('title') ?? '',
            status: searchParams.get('status') ?? 'all',
        },
    );

    const filteredMoviesList = movies?.filter((movie) => {
        let result = false;

        if (filters.title && filters.status !== 'all') {
            result =
                movie.title
                    .toLowerCase()
                    .includes(filters.title.toLowerCase()) &&
                movie.status.toLowerCase() === filters.status?.toLowerCase();
            console.log('result', result);
            return result;
        }

        if (filters.title) {
            result = movie.title
                .toLowerCase()
                .includes(filters.title.toLowerCase());
        }

        if (filters.status !== 'all') {
            result =
                movie.status.toLowerCase() === filters.status?.toLowerCase();
        }

        return result;
    });

    const isFiltered =
        !!searchParams.get('title') ||
        searchParams.get('status')?.toLowerCase() !== 'all';

    useEffect(() => {
        setFilteredMovies(filteredMoviesList);
    }, []);

    const handleSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newSearchParams = new URLSearchParams(filters);

            if (newSearchParams.get('title') === '') {
                newSearchParams.delete('title');
            }

            setSearchParams(newSearchParams);
            setFilteredMovies(filteredMoviesList);
        },
        [filters, setSearchParams, filteredMoviesList],
    );

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
                <div className="flex gap-4">
                    <Button
                        color="tertiary"
                        onClick={() => {
                            setSearchParams({});
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
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {isFiltered && filteredMovies
                    ? filteredMovies
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((movie) => (
                              <MovieCard
                                  key={movie.id}
                                  {...movie}
                                  onLike={handleOnLike}
                              />
                          ))
                    : movies
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((movie) => (
                              <MovieCard
                                  key={movie.id}
                                  {...movie}
                                  onLike={handleOnLike}
                              />
                          ))}

                {filteredMovies.length === 0 && (
                    <div className="col-span-4">No movies found</div>
                )}
            </div>
        </>
    );
};
export default MoviesPage;
