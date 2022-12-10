import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from 'src/app/configs/constants';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import { environment } from './../../../environments/environment';
import { IUser } from './../../shared/models/merchant.model';
import { IAuthService } from './auth-service.interface';
@Injectable()
export class AuthService implements IAuthService {
  private baseUrl: string = environment.backendUrl;
  constructor(private readonly http: HttpClient) {}

  protected createUser(payload: IUser): Observable<IUserResponse> {
    const signUpUrl = urls.signup;
    return this.auth(payload, signUpUrl);
  }

  protected login(payload: IUser): Observable<IUserResponse> {
    const loginUrl = urls.login;
    return this.auth(payload, loginUrl);
  }

  private auth(payload: IUser, url: string): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.baseUrl}/${url}`, payload);
  }
}
