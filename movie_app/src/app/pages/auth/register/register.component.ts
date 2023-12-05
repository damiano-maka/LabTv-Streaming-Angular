import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { repeatPasswordValidator } from './repeat-password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

interface RegistrationForm {
  name:FormControl<string>;
  email: FormControl<string>,
  password: FormControl<string>,
  repeatPassword: FormControl<string>
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;

  registrationForm: FormGroup<RegistrationForm> = new FormGroup<RegistrationForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    repeatPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    name: new FormControl('', { 
      nonNullable: true,
      validators: [Validators.required]
    }),
  }, {
    validators: [repeatPasswordValidator]
  });
  
  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {}

  onRegister(): void {
    this.authService.register({
      name: this.registrationForm.controls.name.value,
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value,
    }).subscribe((response) => {

      if(response){
        this.snackBar.open(
        'User registred successfully !',
        'Close',
        {
          duration: 3000
        }
       )
       this.router.navigate(['auth', 'login'])
      }else{
        this.snackBar.open(
          'Oops! Something went wrong. Please try again.',
          'Close',
          {
            duration: 3000
          }
         )
      }
    })
  }

}
