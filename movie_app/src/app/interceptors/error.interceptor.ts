import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private loader: LoaderService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
       this.loader.close();
         if (error.status === 401) {
          this.snackBar.open(
            'Session expired, please log in again.',
            'Close',
            {
              duration: 5000
            }
          ) 
          this.cookieService.remove('accessToken');
          this.router.navigate(['auth', 'login'])  
        } 

        if (error.status === 404) {
          this.snackBar.open(
            'Resource not found',
            'Close',
            {
              duration: 5000
            }
          )
          this.router.navigate(['**'])  
        }

        if (error.status === 500) {
          this.snackBar.open(
            'Item already added',
            'Close',
            {
              duration: 5000
            }
          )
        } 

        if (error.status === 400) {
          this.snackBar.open(
            'User Not Found or Invalid Credentials',
            'Close',
            {
              duration: 5000
            }
          )
        } 

        return throwError(() => {})
      })
    );
  }
}
