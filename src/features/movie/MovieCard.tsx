import type { Movie } from '@mw/types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import placeholderPoster from '@mw/assets/placeholder_poster.jpeg';
import { BsStopwatchFill, BsStarFill } from 'react-icons/bs';
import { useTheme } from '@mw/context/ThemeContext';
import { formatTime } from '@mw/utils';

type MovieCardProps = Movie & {
    isLikeVisible?: boolean;
    onLike: (_id: number) => void;
};

export const MovieCard = ({
    id,
    title,
    genre,
    status,
    year,
    poster,
    rating,
    runtime,
    liked,
    isLikeVisible = true,
    onLike,
}: MovieCardProps) => {
    const { theme } = useTheme();
    const handleOnLike = () => {
        onLike(id);
    };

    return (
        <div className="group relative">
            <Link to={`/movie/${id}`}>
                <img
                    alt={title}
                    src={poster || placeholderPoster}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-100"
                />
            </Link>
            {isLikeVisible && (
                <div
                    className="flex justify-end p-1 m-0 cursor-pointer text-gray-500 dark:text-white"
                    onClick={handleOnLike}
                >
                    {!liked
                        ? `Like ${theme === 'dark' ? '🤍' : '🖤'}`
                        : 'Unlike 💙'}
                </div>
            )}
            <div className="mt-4 flex justify-between">
                <div>
                    <h4 className="text-sm text-gray-700 dark:text-white line-clamp-2 font-mono font-semibold">
                        {title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                        {genre}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                        {year}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <p
                        className={clsx('text-sm', 'font-medium', {
                            'text-green-600': status === 'Watched',
                            'dark:text-green-300': status === 'Watched',
                            'text-yellow-600': status === 'Planned',
                            'dark:text-yellow-300': status === 'Planned',
                        })}
                    >
                        {status}
                    </p>
                    <p className="flex gap-2 items-center mt-1 text-sm text-gray-500 dark:text-gray-200">
                        <span>{runtime && formatTime(runtime)}</span>
                        <BsStopwatchFill />
                    </p>
                    <p className="flex gap-2 items-center mt-1 text-sm text-gray-500 dark:text-gray-200">
                        <span>{rating}</span>
                        <BsStarFill />
                    </p>
                </div>
            </div>
        </div>
    );
};
