import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordPageComponent } from './forgot-password/container/forgot-password-page.component';
import { SigninPageComponent } from './signin/container/signin-page.component';
import { SignupPageComponent } from './signup/container/signup-page.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'register', component: SignupPageComponent },
      { path: 'login', component: SigninPageComponent },
      { path: 'forgotpassword', component: ForgotPasswordPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
