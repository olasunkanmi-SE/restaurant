import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { urls } from 'src/app/configs/constants';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import * as authActions from '../state/auth.actions';
import * as fromAuthReducer from '../state/auth.reducer';
import { environment } from './../../../environments/environment';
import { IUser } from './../../shared/models/merchant.model';
import { StorageService } from './../../shared/services/storage.service';
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private baseUrl: string = environment.backendUrl;
  tokenExpiration: string | null;
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<fromAuthReducer.IAuthState>,
    protected readonly storage: StorageService,
    protected readonly router: Router
  ) {
    this.tokenExpiration = this.storage.getItem('expiration');
  }

  protected createUser(payload: IUser): Observable<IUserResponse> {
    return this.auth(payload, urls.signup);
  }

  protected login(payload: IUser): Observable<IUserResponse> {
    return this.auth(payload, urls.login);
  }

  private auth(payload: IUser, url: string): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.baseUrl}/${url}`, payload);
  }

  public loginUser(props: any) {
    this.store.dispatch(new authActions.LoginUser(props));
  }

  public signUpUser(props: any) {
    this.store.dispatch(new authActions.CreateUser(props));
  }

  public IsAuthenticated(): boolean {
    let authenticated = false;
    if (this.tokenExpiration && Number(this.tokenExpiration) > Date.now()) {
      authenticated = true;
    }
    return authenticated;
  }

  public logOut() {
    this.storage.clear();
  }
}
