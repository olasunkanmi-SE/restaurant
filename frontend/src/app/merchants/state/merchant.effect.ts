import { IResult } from './../../shared/models/result';
import { IMerchant } from './../../shared/models/merchant.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, mergeMap, Observable, catchError, of } from 'rxjs';
import { MerchantService } from '../service/merchant.service';
import * as merchantActions from '../state/merchant.actions';

@Injectable()
export class MerchantEffect {
  constructor(
    private actions$: Actions,
    private readonly merchantService: MerchantService
  ) {}
  loadMerchants$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<merchantActions.GetMerchants>(
        merchantActions.merchantActionTypes.GET_MERCHANTS
      ),
      mergeMap((actions: merchantActions.GetMerchants) =>
        this.merchantService.getMerchants().pipe(
          map(
            (merchants: IMerchant[]) =>
              new merchantActions.GerMerchantsSuccess(merchants)
          ),
          catchError((err: IResult) =>
            of(new merchantActions.GerMerchantsFailure(err.message.message))
          )
        )
      )
    );
  });
}
