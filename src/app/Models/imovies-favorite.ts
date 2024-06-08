import { iMovies } from './imovies';

export interface iMoviesFavorite {
  id: number;
  userId: Number;
  movie: iMovies;
}
