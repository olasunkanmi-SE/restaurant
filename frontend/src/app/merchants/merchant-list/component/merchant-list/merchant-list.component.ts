import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IMerchant } from './../../../../shared/models/merchant.model';
import { Component, OnInit } from '@angular/core';
import * as merchantActions from '../../../state/merchant.actions';
import * as fromMerchantReducer from '../../../state/merchant.reducer';
import * as fromAppReducer from '../../../../state/app.reducer';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  private merchants$: Observable<IMerchant[]> | undefined;
  constructor(private store: Store<fromMerchantReducer.IMerchantsState>) {}
  ngOnInit(): void {}

  getMerchants() {
    this.store.dispatch(new merchantActions.GetMerchants());
    this.merchants$ = this.store.pipe(select(fromAppReducer.getMerchants));
  }
}
