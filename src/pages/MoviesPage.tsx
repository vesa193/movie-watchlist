import { useLikeMovie } from '@mw/features/movie/hooks/useLikeMovie';
import { MovieCard } from '@mw/features/movie/MovieCard';
import { MovieFilterFields } from '@mw/features/movies/MovieFilterFields';
import { useMovies } from '@mw/hooks/useMovies';
import type { Movie } from '@mw/types';
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
    const [filters, setFilters] = useState<{
        title: string;
        status: string;
    }>({
        title: searchParams.get('title') ?? '',
        status: searchParams.get('status') ?? 'all',
    });
    const isSearchParamsExist = searchParams.size > 0;

    console.log('isSearchParamsExist', isSearchParamsExist, filteredMovies);

    const filteredMoviesList = movies?.filter((movie) => {
        let result = true;

        if (filters?.title && filters?.status?.toLowerCase() !== 'all') {
            result =
                movie.title
                    .toLowerCase()
                    .includes(filters?.title!.toLowerCase()) &&
                movie.status.toLowerCase() === filters?.status?.toLowerCase();
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
        setFilteredMovies(filteredMoviesList);
    }, []);

    if (isLoadingMovies) {
        return <div>Loading...</div>;
    }

    if (movies.length === 0) {
        return <div>No movies found</div>;
    }

    return (
        <>
            <MovieFilterFields
                filters={filters}
                setFilters={setFilters}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                setFilteredMovies={setFilteredMovies}
                movies={movies}
                handleSearch={handleSearch}
            />
            <div className="p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {isSearchParamsExist
                    ? filteredMovies
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((movie) => (
                              <MovieCard
                                  key={movie?.id}
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
                    <p className="text-gray-700 dark:text-gray-50">
                        No movies found
                    </p>
                )}

                {!isSearchParamsExist && movies.length === 0 && (
                    <p className="text-gray-700 dark:text-gray-50">
                        No movies found
                    </p>
                )}
            </div>
        </>
    );
};
export default MoviesPage;
