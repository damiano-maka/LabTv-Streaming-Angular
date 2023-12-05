import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ResponseByID, favouriteM } from 'src/app/models/movieID.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';  
import { UserModel } from 'src/app/models/auth.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: Array<favouriteM> = [];
  user: UserModel;

  constructor(
    private favoriteService: FavoriteService,
    private loader: LoaderService,
    private authService: AuthService
  ) {
    this.user = this.authService.userInfo();
    this.loadAllFavorites();
  }

  private loadAllFavorites(): void {
    this.loader.open();
    this.favoriteService.getAllFavorites(this.user.id).subscribe((data) => {
      this.favorites = data;
      this.loader.close();
    });
  }

  public removeMovieFromFavorites(movie: favouriteM): void {
    this.loader.open();

    this.favoriteService.removeFromFavorites(movie.id)
      .pipe(
        switchMap(() => this.favoriteService.getAllFavorites(this.user.id))
      )
      .subscribe(
        (data: Array<favouriteM>) => {
          this.favorites = data;
          this.loader.close();
        },
        (error) => {
          console.error('Error removing movie:', error);
          this.loader.close();
        }
      );
  }
}
