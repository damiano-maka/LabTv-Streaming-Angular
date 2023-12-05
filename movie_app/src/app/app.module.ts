//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
//auth
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
//Libraries
import { CookieModule } from 'ngx-cookie';
//ANGULAR MATERIAL
import {MatIconModule} from '@angular/material/icon'
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'
//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
//DASHBOARD
import { MoviesComponent } from './pages/movies/movies.component';
import { FavoritesComponent } from './pages/movies/favourites/favorites.component';
import { MovieSliderComponent } from './components/movie-slider/movie-slider.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';
import { CatalogComponent } from './pages/movies/catalog/catalog.component';
import { SearchComponent } from './pages/movies/search/search.component';
import { LoaderComponent } from './components/loader/loader.component';
import { YoutubePlayerComponent } from './components/yt-player/yt-player.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    FavoritesComponent,
    MovieSliderComponent,
    MovieDetailsComponent,
    CatalogComponent,
    SearchComponent,
    LoaderComponent,
    YoutubePlayerComponent,
    NotFoundComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule,
    CookieModule.withOptions(),
    BrowserAnimationsModule,
    MatIconModule,MatSnackBarModule,MatProgressSpinnerModule,MatDialogModule,MatMenuModule,
    YouTubePlayerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
