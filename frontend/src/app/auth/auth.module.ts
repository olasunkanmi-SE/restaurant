import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatcomponentModule } from './../modules/matcomponent/matcomponent.module';

import { CoreModule } from '../core/core.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/component/forgot-password.component';
import { ForgotPasswordPageComponent } from './forgot-password/container/forgot-password-page.component';
import { SigninComponent } from './signin/component/signin.component';
import { SigninPageComponent } from './signin/container/signin-page.component';
import { SignupComponent } from './signup/component/signup.component';
import { SignupPageComponent } from './signup/container/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatcomponentModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
