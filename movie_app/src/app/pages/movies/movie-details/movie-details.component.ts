import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostFavourite, ResponseByID, Result, favouriteM } from 'src/app/models/movieID.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MovieService } from 'src/app/services/movie.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movieDetails!: ResponseByID;
  mov: Result[] = [];
  user: UserModel = this.authService.userInfo();
  favorites: Array<favouriteM> = [];

 
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService,
    private loader: LoaderService,
    private favoriteService: FavoriteService,
    private snackBar: MatSnackBar
  ) {
    this.loader.open();

    this.activatedRoute.params.pipe(
      switchMap((params) => this.movieService.getMovieByID(params['id']))
    ).subscribe((details: ResponseByID) => {
      this.movieDetails = details;
      this.loader.close();
      console.log(this.movieDetails);

      this.mov = this.movieDetails.videos.results
        .filter((v) => v.type.toLowerCase().includes('trailer'));
    });
  }
  

  public addFavorite(): void {
    const userId = this.user.id;

    this.loader.open();
      this.favoriteService.addToFavorite(userId, this.movieDetails).subscribe(() => {
        this.loader.close();
        this.snackBar.open(
          'Movie added successfully',
          'Close',
          {
            duration: 2000,
          }
        );
      });
    }

    public goToWatch(link: string): void {
      window.open(link, '_blank');
    }
  }
  


