import { Store } from '@ngrx/store';
import { IMerchant } from './../../../../shared/models/merchant.model';
import { Component, OnInit } from '@angular/core';
import * as merchantActions from '../../../state/merchant.actions';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  private merchants: IMerchant | undefined;
  constructor(private store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(new merchantActions.GetMerchants());
    this.store.subscribe((state) => (this.merchants = state.merchant));
  }
}
