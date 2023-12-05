import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { FavoritesComponent } from './pages/movies/favourites/favorites.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';
import { CatalogComponent } from './pages/movies/catalog/catalog.component';
import { SearchComponent } from './pages/movies/search/search.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies/catalog',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { path: 'catalog/:id', component: MovieDetailsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'player/:id', component: VideoPlayerComponent },
      { path: 'favourites', component: FavoritesComponent },
      { path: '**', component: NotFoundComponent }
    ],
  },{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
