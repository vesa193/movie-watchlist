import type { Movie } from '@mw/types';
import clsx from 'clsx';
import placeholderPoster from '@mw/assets/placeholder_poster.jpeg';
import { useTheme } from '@mw/context/ThemeContext';
import { formatTime } from '@mw/utils';
import { BsStarFill, BsStopwatchFill } from 'react-icons/bs';

type MovieDetailsProps = {
    movie: Movie;
    onLike: (_id: number) => void;
};

export const MovieDetails = ({ movie, onLike }: MovieDetailsProps) => {
    const { theme } = useTheme();
    const liked = movie?.liked;

    return (
        <div className="m-5 p-4 w-[370px] border-1 border-gray-700 dark:border-gray-500">
            <h4 className="text-2xl font-mono mb-4 text-gray-700 dark:text-gray-50">
                {movie?.title}
            </h4>
            <img
                className="shadow-lg"
                src={movie?.poster || placeholderPoster}
                width={400}
                alt={movie?.title}
            />
            <div
                className="flex justify-end p-1 m-0 cursor-pointer text-gray-500 dark:text-gray-50"
                onClick={() => onLike(Number(movie.id))}
            >
                {!liked
                    ? `Like ${theme === 'dark' ? '🤍' : '🖤'}`
                    : 'Unlike 💙'}
            </div>
            <p className="mt-4 mb-4 text-md text-gray-500 dark:text-gray-50">
                {movie?.synopsis}
            </p>
            <p
                className={clsx(
                    'text-sm',
                    'font-medium',
                    'text-gray-900',
                    'justify-self-end',
                    {
                        'text-green-600': movie?.status === 'Watched',
                        'dark:text-green-300': movie?.status === 'Watched',
                        'text-yellow-600': movie?.status === 'Planned',
                        'dark:text-yellow-600': movie?.status === 'Planned',
                    },
                )}
            >
                {movie?.status}
            </p>
            <div className="mt-4 flex justify-between">
                <div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-50">
                        {movie?.genre}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-50">
                        {movie?.year}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="flex gap-2 items-center mt-1 text-sm text-gray-500 dark:text-gray-50">
                        {movie?.runtime && formatTime(movie.runtime)}
                        <BsStopwatchFill />
                    </p>
                    <p className="flex gap-2 items-center mt-1 text-sm text-gray-500 dark:text-gray-50">
                        {movie?.rating}
                        <BsStarFill />
                    </p>
                </div>
            </div>
        </div>
    );
};
