export type Movie = {
    id: number;
    title: string;
    genre: string;
    status: string;
    year?: number;
    poster: string;
    rating: number;
    runtime?: number;
    liked: boolean;
    synopsis?: string;
};
