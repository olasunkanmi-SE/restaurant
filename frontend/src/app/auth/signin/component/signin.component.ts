import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { form } from 'src/app/configs/constants';
import { FormCustomValidation } from './../../../shared/utility/form-custom.validation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: any;
  hide: boolean = false;
  constructor(private form: FormBuilder) {}
  ngOnInit(): void {
    this.signInForm = this.form.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          FormCustomValidation.patternValidator(form.emailPattern, {
            hasEmail: true,
          }),
        ]),
      ],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.signInForm.get(form.email);
  }

  get password() {
    return this.signInForm.get(form.password);
  }
}
