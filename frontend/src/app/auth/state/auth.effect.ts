import { StorageService } from './../../shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import { IResult } from './../../shared/models/result';
import { AuthService } from './../service/auth.service';
import * as authActions from './auth.actions';
import * as fromAuthReducer from '../state/auth.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect extends AuthService {
  constructor(
    http: HttpClient,
    store: Store<fromAuthReducer.IAuthState>,
    private readonly storage: StorageService,
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(http, store);
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
            this.router.navigate(['login'], {
              relativeTo: this.route,
              skipLocationChange: true,
            });
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
            this.storage.saveToken(response.payload.data.tokens?.accessToken);
            this.router.navigate(['/']);
          }),
          catchError((error: IResult) =>
            of(new authActions.LoginUserFailure(error.message.message))
          )
        )
      )
    );
  });
}
