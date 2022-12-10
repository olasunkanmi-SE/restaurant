import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { IUserResponse } from 'src/app/shared/models/merchant.model';
import { IResult } from './../../shared/models/result';
import { AuthService } from './../service/auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private readonly auth: AuthService) {}

  createUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<authActions.CreateUser>(authActions.AuthActionTypes.CREATE_USER),
      mergeMap((action: authActions.CreateUser) =>
        this.auth.createUser(action.payload).pipe(
          map(
            (response: IUserResponse) =>
              new authActions.CreateUserSuccess(response)
          ),
          catchError((error: IResult) =>
            of(new authActions.CreateUserFailure(error.message.message))
          )
        )
      )
    );
  });
}
