import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken: string | undefined = this.cookieService.get('accessToken');

    if (accessToken) {
      request = request.clone({
        setHeaders: { 'Authorization': `Bearer ${accessToken}`}
      })
    }

    return next.handle(request);
  }
}
