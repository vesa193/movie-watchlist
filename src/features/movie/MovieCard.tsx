import type { Movie } from '@mw/types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

type MovieCardProps = Movie & {
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
    onLike,
}: MovieCardProps) => {
    const handleOnLike = () => {
        onLike(id);
    };

    return (
        <div className="group relative">
            <Link to={`/movie/${id}`}>
                <img
                    alt={title}
                    src={poster}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-100"
                />
            </Link>
            <div
                className="flex justify-end p-1 m-0 cursor-pointer"
                onClick={handleOnLike}
            >
                {!liked ? 'Like 🖤' : 'Unlike 💙'}
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h4 className="text-sm text-black-700 line-clamp-2 font-mono font-semibold">
                        {title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">{genre}</p>
                    <p className="mt-1 text-sm text-gray-500">{year}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p
                        className={clsx(
                            'text-sm',
                            'font-medium',
                            'text-gray-900',
                            {
                                'text-green-600': status === 'Watched',
                                'text-yellow-600': status === 'Planned',
                            },
                        )}
                    >
                        {status}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{`${runtime && Math.floor(runtime / 60)}h`}</p>
                    <p className="mt-1 text-sm text-gray-500">{rating}</p>
                </div>
            </div>
        </div>
    );
};
