import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestModel, AuthResponseModel, UserModel, UserbyID } from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = 'http://localhost:3000';

  userName: string = "";

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.cookieService.get('accessToken') !== undefined)
  
 
  constructor(private http: HttpClient,private cookieService: CookieService  ) {  }


  public login(body: AuthRequestModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseURL}/login`, body)
  }


  public register(body: AuthRequestModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseURL}/register`, body)
  }

  public userInfo(): UserModel  {
    return JSON.parse(this.cookieService.get('user')!) as UserModel
  }
  

}


