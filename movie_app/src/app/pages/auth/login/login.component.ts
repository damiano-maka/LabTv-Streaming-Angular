import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie';
import { AuthRequestModel, AuthResponseModel, UserModel } from 'src/app/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';

interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordVisible: boolean = false;
DATAUSER : UserModel[] = []
  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators:[Validators.required]
    })
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private loader: LoaderService,
    private snackBar: MatSnackBar ) {}

    userData! : UserModel 
    onLogin(): void {
    /*  this.loader.open()
      if (this.loginForm.value.email == 'test@test.com' && this.loginForm.value.password == 'test123') {
        const accessToken = 'fakeAccessToken';
        const dataUSER = {
          name: "test",
          email: "test@test.com",
          id: 1,
        }
        this.cookieService.put('user', JSON.stringify(dataUSER))
        this.cookieService.put('accessToken', accessToken);
  
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['movies/catalog']);
        this.loader.close()

      }
*/
       this.loader.open()
      this.authService
        .login(this.loginForm.value as AuthRequestModel)
        .subscribe((data: AuthResponseModel) => {
          this.snackBar.open(
            `User logged in successfully !` ,
            'Close',
            {
              duration: 3000
            }
          )
            
          this.cookieService.put('user', JSON.stringify(data.user))
          this.cookieService.put('accessToken', data.accessToken)
          this.router.navigate(['movies/catalog'])
          this.authService.isLoggedIn$.next(true)
          this.loader.close()

        }) 
    } 
    
}
