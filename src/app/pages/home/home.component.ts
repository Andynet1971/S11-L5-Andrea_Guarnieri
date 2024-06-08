import { Component } from '@angular/core';
import { iMovies } from '../../Models/imovies';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies: iMovies[] = [];

  constructor(private movieSvc: MoviesService) {}

  ngOnInit() {
    this.movieSvc.getAll().subscribe((movie) => (this.movies = movie));
  }
}
