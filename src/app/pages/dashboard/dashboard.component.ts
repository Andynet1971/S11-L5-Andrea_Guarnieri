import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../authorize/authorize.service';
import { iUser } from '../../Models/i-user';
import { iMovies } from '../../Models/imovies';
import { iMoviesFavorite } from '../../Models/imovies-favorite';
import { MoviesService } from '../../movies.service';
import { MoviesFavoriteService } from '../../movies-favorite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: iUser;
  movies: iMovies[] = [];
  favoriteMovies: iMoviesFavorite[] = [];

  constructor(
    private authSvc: AuthorizeService,
    private movieSvc: MoviesService,
    private favoriteMovieSvc: MoviesFavoriteService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.loadUserFavorites();
      }
    });
    this.movieSvc.getAll().subscribe((movies) => (this.movies = movies));
  }

  loadUserFavorites(): void {
    this.favoriteMovieSvc.getAll().subscribe({
      next: (favoriteMovies) => {
        this.favoriteMovies = favoriteMovies.filter(
          (fav) => fav.userId === this.user.id
        );
      },
      error: (err) => {
        console.error('Error loading user favorites:', err);
      },
    });
  }

  toggleFavoriteMovie(movieTitle: string): void {
    const movie = this.movies.find((m) => m.title === movieTitle);

    if (!movie) {
      console.error(`Movie with title ${movieTitle} not found.`);
      return;
    }

    const favoriteIndex = this.favoriteMovies.findIndex(
      (fav) => fav.userId === this.user.id && fav.movie.id === movie.id
    );

    if (favoriteIndex !== -1) {
      const favoriteMovie = this.favoriteMovies[favoriteIndex];
      this.favoriteMovieSvc.deleteMovie(favoriteMovie.id).subscribe({
        next: () => {
          this.favoriteMovies.splice(favoriteIndex, 1);
          console.log(
            `Movie with title ${movieTitle} removed from favorites for user ${this.user.id}`
          );
        },
        error: (err) => {
          console.error('Error removing favorite movie:', err);
        },
      });
    } else {
      const newFavorite: Partial<iMoviesFavorite> = {
        userId: this.user.id,
        movie: movie,
      };
      this.favoriteMovieSvc.pushMovie(newFavorite).subscribe({
        next: (addedFavorite) => {
          this.favoriteMovies.push(addedFavorite);
          console.log(
            `Movie with title ${movieTitle} added to favorites for user ${this.user.id}`
          );
        },
        error: (err) => {
          console.error('Error adding favorite movie:', err);
        },
      });
    }
  }

  isFavorite(movie: iMovies): boolean {
    return this.favoriteMovies.some((fav) => fav.movie.id === movie.id);
  }

  getFavoriteImage(movie: iMovies): string {
    return this.isFavorite(movie)
      ? '../../../assets/heartFill.png' // Immagine se il film è tra i preferiti
      : '../../../assets/heart.png'; // Immagine se il film non è tra i preferiti
  }
}
