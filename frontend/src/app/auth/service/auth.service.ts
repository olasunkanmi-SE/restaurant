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
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private baseUrl: string = environment.backendUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<fromAuthReducer.IAuthState>
  ) {}

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
}
