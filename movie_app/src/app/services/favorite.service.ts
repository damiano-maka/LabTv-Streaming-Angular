import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostFavourite, ResponseByID, favouriteM } from '../models/movieID.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public addToFavorite(userId: number, movie: PostFavourite): Observable<any> {
    const favorite = {
      id: movie.id + '-usr-' + userId,
      userId: userId,
      movie: {
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        title: movie.title,
        id: movie.id
      },
    };
    return this.http.post(`${this.baseUrl}/favourite`, favorite);
  }

  public getAllFavorites(userId: number): Observable<Array<favouriteM>> {
    return this.http.get<Array<favouriteM>>(`${this.baseUrl}/favourite?userId=${userId}`);
  }

  public removeFromFavorites(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favourite/${id}`);
  }
}