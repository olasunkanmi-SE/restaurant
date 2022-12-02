import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { form } from 'src/app/configs/constants';
import { FormCustomValidation } from './../../../shared/utility/form-custom.validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  hide: boolean = true;
  constructor(private form: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.form.group(
      {
        email: [
          '',
          Validators.compose([
            Validators.required,
            FormCustomValidation.patternValidator(form.emailPattern, {
              hasEmail: true,
            }),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            FormCustomValidation.patternValidator(form.numberPattern, {
              hasNumber: true,
            }),
            FormCustomValidation.patternValidator(form.capitalCasePattern, {
              hasCapitalCase: true,
            }),
            FormCustomValidation.patternValidator(form.lowerCasePattern, {
              hasSmallCase: true,
            }),
          ]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validator: FormCustomValidation.passwordMatchValidator,
      }
    );
  }

  get email() {
    return this.signUpForm.get(form.email);
  }

  get password() {
    return this.signUpForm.get(form.password);
  }

  get confirmPassword() {
    return this.signUpForm.get(form.confirmPassword);
  }
}
