import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { form } from 'src/app/configs/constants';
import * as fromAppReducer from '../../../state/app.reducer';
import * as fromAuthReducer from '../../state/auth.reducer';
import { FormCustomValidation } from './../../../shared/utility/form-custom.validation';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: any;
  hide: boolean = true;
  errorMessage$: Observable<string> | undefined;
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
    this.errorMessage$ = this.store.pipe(select(fromAppReducer.authError));
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
