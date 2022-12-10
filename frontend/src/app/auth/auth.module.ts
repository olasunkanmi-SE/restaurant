import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatcomponentModule } from './../modules/matcomponent/matcomponent.module';
import { AuthEffect } from './state/auth.effect';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/component/forgot-password.component';
import { ForgotPasswordPageComponent } from './forgot-password/container/forgot-password-page.component';
import { SigninComponent } from './signin/component/signin.component';
import { SigninPageComponent } from './signin/container/signin-page.component';
import { SignupComponent } from './signup/component/signup.component';
import { SignupPageComponent } from './signup/container/signup-page.component';
import { authReducer } from './state/auth.reducer';

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
    EffectsModule.forFeature([AuthEffect]),
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthModule {}
