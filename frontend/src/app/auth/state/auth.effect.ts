import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import { generateUuid } from 'src/app/shared/utility/genrate-uuid';
import { calculateTokenExpiration } from 'src/app/shared/utility/utility';
import * as fromAuthReducer from '../state/auth.reducer';
import { IResult } from './../../shared/models/result';
import { StorageService } from './../../shared/services/storage.service';
import { AuthService } from './../service/auth.service';
import * as authActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect extends AuthService {
  constructor(
    http: HttpClient,
    store: Store<fromAuthReducer.IAuthState>,
    storage: StorageService,
    private actions$: Actions,
    router: Router
  ) {
    super(http, store, storage, router);
  }

  createUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.CreateUser>(authActions.AuthActionTypes.CREATE_USER),
      mergeMap((action: authActions.CreateUser) =>
        this.createUser(action.payload).pipe(
          map(
            (response: IUserResponse) =>
              new authActions.CreateUserSuccess(response)
          ),
          tap(() => {
            this.router.navigate(['/']);
          }),
          catchError((error: IResult) =>
            of(new authActions.CreateUserFailure(error.message.message))
          )
        )
      )
    );
  });

  loginUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.LoginUser>(authActions.AuthActionTypes.LOGIN_USER),
      mergeMap((action: authActions.LoginUser) =>
        this.login(action.payload).pipe(
          map(
            (response: IUserResponse) =>
              new authActions.LoginUserSuccess(response)
          ),
          tap((response) => {
            const { tokenExpiresIn, tokens, email } = response.payload.data;
            const tokenExpires: number =
              calculateTokenExpiration(tokenExpiresIn);
            console.log(tokenExpires);
            this.storage.saveToken(tokens?.accessToken);
            this.storage.saveItem('x-correlation-id', generateUuid());
            this.storage.saveItem('x-user-email', email);
            this.storage.saveItem('expiration', tokenExpires);
            this.router.navigate(['home']);
          }),
          catchError((error: IResult) =>
            of(new authActions.LoginUserFailure(error.message))
          )
        )
      )
    );
  });
}
