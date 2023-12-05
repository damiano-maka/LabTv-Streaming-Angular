import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AuthRequestModel, AuthResponseModel, UserModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent  {
  s: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  user: UserModel = this.authService.userInfo()

  isLogoutVisible: Observable<boolean> = this.authService.isLoggedIn$.asObservable();

  constructor(private router: Router,private snackBar: MatSnackBar, private cookieService : CookieService  , private authService: AuthService,private el: ElementRef) {
  }

  scrollToCatalog() {
    const catalogElement = this.el.nativeElement.querySelector('#catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  searchMovies(): void {
    if (this.s === '') {
      this.snackBar.open(
        `Please enter a name` ,
        'Close',
        {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        }
      )
    }else{
    this.router.navigate(['/movies/search'], { queryParams: { s: this.s } });
    this.s = '';
         }
  }
  
  onLogout(): void {
    this.cookieService.remove('accessToken');
    this.router.navigate(['auth', 'login'])
    this.authService.isLoggedIn$.next(false)
  }


}