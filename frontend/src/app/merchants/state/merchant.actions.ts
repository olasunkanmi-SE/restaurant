import { IMerchant } from './../../shared/models/merchant.model';
import { Action } from '@ngrx/store';

export enum merchantActionTypes {
  GET_MERCHANTS = '[Merchant] Load Merchants',
  GET_MERCHANTS_SUCCESS = '[Merchant] Load Merchants Success',
  GET_MERCHANTS_FAILURE = '[Merchant] Load Merchants Failure',
}

export class GetMerchants implements Action {
  readonly type = merchantActionTypes.GET_MERCHANTS;
}

export class GerMerchantsSuccess implements Action {
  readonly type = merchantActionTypes.GET_MERCHANTS_SUCCESS;
  constructor(public payload: IMerchant[]) {}
}

export class GerMerchantsFailure implements Action {
  readonly type = merchantActionTypes.GET_MERCHANTS_FAILURE;
  constructor(public payload: string) {}
}

export type MerchantsActions =
  | GetMerchants
  | GerMerchantsSuccess
  | GerMerchantsFailure;
