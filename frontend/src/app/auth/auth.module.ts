import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/component/signup.component';
import { SignupPageComponent } from './signup/container/signup-page.component';
import { SigninComponent } from './signin/component/signin.component';
import { SigninPageComponent } from './signin/container/signin-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/container/forgot-password-page.component';
import { ForgotPasswordComponent } from './forgot-password/component/forgot-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SignupPageComponent,
    SigninComponent,
    SigninPageComponent,
    ForgotPasswordPageComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
