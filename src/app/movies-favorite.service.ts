import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMoviesFavorite } from './Models/imovies-favorite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesFavoriteService {
  apiUrl: string = 'http://localhost:3000/movies_preferiti';

  constructor(private http: HttpClient) {}

  getAll(): Observable<iMoviesFavorite[]> {
    return this.http.get<iMoviesFavorite[]>(this.apiUrl);
  }

  getById(id: number): Observable<iMoviesFavorite> {
    return this.http.get<iMoviesFavorite>(`${this.apiUrl}/${id}`);
  }

  pushMovie(newMovie: Partial<iMoviesFavorite>): Observable<iMoviesFavorite> {
    return this.http.post<iMoviesFavorite>(this.apiUrl, newMovie);
  }

  deleteMovie(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
