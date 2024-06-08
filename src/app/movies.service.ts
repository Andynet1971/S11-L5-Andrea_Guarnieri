import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMovies } from './Models/imovies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl: string = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iMovies[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<iMovies>(`${this.apiUrl}/${id}`);
  }
}
