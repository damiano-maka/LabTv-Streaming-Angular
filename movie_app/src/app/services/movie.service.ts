import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieType, Response } from '../models/movie.model';
import { ResponseByID } from '../models/movieID.model';
@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private apiKey = '2245e7b70e506bfeca959594cb82c0b9'; 
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private addApiKey(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}api_key=${this.apiKey}`;
  }

  getMovie(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?include_video=true&language=en-US&page=${number}&sort_by=popularity.desc`);
    return this.http.get<Response>(url);
  }

  getMovieByID(id: number): Observable<ResponseByID> {
    const url = this.addApiKey(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`);
    return this.http.get<ResponseByID>(url);
  }

  getSearch(name: string, number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/search/movie?query=${name}&include_adult=false&language=en-US&page=${number}`);
    return this.http.get<Response>(url);
  }

  AdventureMovies(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?page=${number}&with_genres=12`);
    return this.http.get<Response>(url);
  }

  AnimationMovies(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?page=${number}&with_genres=16`);
    return this.http.get<Response>(url);
  }

  ThrillerMovies(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?page=${number}&with_genres=53`);
    return this.http.get<Response>(url);
  }

  ComedyMovies(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?page=${number}&with_genres=35`);
    return this.http.get<Response>(url);
  }

  DocumentaryMovies(number: number): Observable<Response> {
    const url = this.addApiKey(`${this.baseUrl}/discover/movie?page=${number}&with_genres=99`);
    return this.http.get<Response>(url);
  }
}