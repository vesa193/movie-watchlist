export type Movie = {
    id: number;
    title: string;
    genre: string;
    status: string;
    year?: number;
    poster: string;
    rating: number;
    runtime?: number;
    liked: boolean | string | null;
    synopsis?: string;
};

export type GenreType =
    | 'Action'
    | 'Comedy'
    | 'Drama'
    | 'Horror'
    | 'Romance'
    | 'Thriller'
    | 'Adventure'
    | 'Crime'
    | 'Documentary'
    | 'Mystery'
    | 'Sci-Fi'
    | 'Animation'
    | 'Biography'
    | 'Drama'
    | 'History'
    | 'Music'
    | 'Musical'
    | 'Romance'
    | 'Thriller'
    | 'War'
    | 'Western';
