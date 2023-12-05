import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const repeatPasswordValidator: ValidatorFn = (form: AbstractControl): null | ValidationErrors => {
  const password = form.get('password')?.value;
  const repeatPassword = form.get('repeatPassword')?.value;


  if (password !== repeatPassword) {
    return { repeatPasswordError: true }
  }

  return null;
}
