import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { form } from 'src/app/configs/constants';
import { FormCustomValidation } from './../../../shared/utility/form-custom.validation';
import * as fromAuthReducer from '../../state/auth.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: any;
  hide: boolean = false;
  constructor(
    private form: FormBuilder,
    private readonly store: Store<fromAuthReducer.IAuthState>,
    private readonly auth: AuthService,
    private router: Router
  ) {}
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

  onSubmit() {
    this.auth.loginUser(this.signInForm.value);
  }
}
