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
    const isSearchParamsExist = searchParams.size > 0;

    const filteredMoviesList = movies?.filter((movie) => {
        let result = true;

        if (filters?.title && filters?.status?.toLowerCase() !== 'all') {
            result =
                movie.title
                    .toLowerCase()
                    .includes(filters?.title!.toLowerCase()) &&
                movie.status.toLowerCase() === filters?.status?.toLowerCase();
            console.log('result', result);
            return result;
        }

        if (filters?.title) {
            result = movie.title
                .toLowerCase()
                .includes(filters?.title!.toLowerCase());
            return result;
        }

        if (filters?.status?.toLowerCase() !== 'all') {
            console.log('movie.status', filters?.status);
            result =
                movie.status.toLowerCase() === filters?.status?.toLowerCase();
            return result;
        }

        return result;
    });

    const handleSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newSearchParams = new URLSearchParams(filters);
            console.log('newSearchParams', newSearchParams.toString());

            if (newSearchParams.get('title') === '') {
                newSearchParams.delete('title');
            }

            setSearchParams(newSearchParams);
            setFilteredMovies(filteredMoviesList);
        },
        [filters, setSearchParams, filteredMoviesList],
    );

    useEffect(() => {
        if (filteredMoviesList?.length > 0) {
            setFilteredMovies(filteredMoviesList);
        }

        setFilteredMovies([]);
    }, []);

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
                    placeholder='eg. "The Matrix"'
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
                {isSearchParamsExist
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

                {isSearchParamsExist && filteredMovies?.length === 0 && (
                    <p>No movies found</p>
                )}

                {!isSearchParamsExist && movies.length === 0 && (
                    <p>No movies found</p>
                )}
            </div>
        </>
    );
};
export default MoviesPage;
