import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { CookieService } from 'ngx-cookie';
export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);

  const accessToken: string | undefined = cookieService.get('accessToken');

  if (!accessToken) {
    router.navigate(['auth', 'login'])
    return false;
  }

  return true;
};
