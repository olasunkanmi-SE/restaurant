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

  createUser(payload: IUser): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(
      `${this.baseUrl}/${urls.signup}`,
      payload
    );
  }
}
