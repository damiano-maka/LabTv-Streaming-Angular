import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent   {
  isLoaderVisible: Observable<Boolean> = this.loader.loader$.asObservable();

  constructor(
    private loader: LoaderService
    ) {}

  }

