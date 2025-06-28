import type { Movie } from '@mw/types';
import clsx from 'clsx';

type MovieDetailsProps = {
    movie: Movie;
    onLike: (_id: number) => void;
};

export const MovieDetails = ({ movie, onLike }: MovieDetailsProps) => (
    <div className="m-5 p-4 w-[370px] border-1">
        <h4 className="text-2xl font-mono mb-4">{movie?.title}</h4>
        <img
            className="shadow-lg"
            src={movie?.poster}
            width={400}
            alt={movie?.title}
        />
        <div
            className="flex justify-end p-1 m-0 cursor-pointer"
            onClick={() => onLike(Number(movie.id))}
        >
            {!movie?.liked ? 'Like 🖤' : 'Unlike 💙'}
        </div>
        <p className="mt-4 mb-4 text-md">{movie?.synopsis}</p>
        <p
            className={clsx(
                'text-sm',
                'font-medium',
                'text-gray-900',
                'justify-self-end',
                {
                    'text-green-600': movie?.status === 'Watched',
                    'text-yellow-600': movie?.status === 'Planned',
                },
            )}
        >
            {movie?.status}
        </p>
        <div className="mt-4 flex justify-between">
            <div>
                <p className="mt-1 text-sm text-gray-500">{movie?.genre}</p>
                <p className="mt-1 text-sm text-gray-500">{movie?.year}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="mt-1 text-sm text-gray-500">{`${movie?.runtime && Math.floor(movie.runtime / 60)}h`}</p>
                <p className="mt-1 text-sm text-gray-500">{movie?.rating}</p>
            </div>
        </div>
    </div>
);
