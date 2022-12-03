import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './merchants.component';
import { MerchantEditComponent } from './merchant-edit/component/merchant-edit/merchant-edit.component';
import { MerchantPageEditComponent } from './merchant-edit/container/merchant-page-edit/merchant-page-edit.component';
import { MerchantDetailsComponent } from './merchant-details/component/merchant-details/merchant-details.component';
import { MerchantPageDetailsComponent } from './merchant-details/container/merchant-page-details/merchant-page-details.component';
import { MerchantListComponent } from './merchant-list/component/merchant-list/merchant-list.component';
import { MerchantListPageComponent } from './merchant-list/container/merchant-list-page/merchant-list-page.component';

@NgModule({
  declarations: [
    MerchantsComponent,
    MerchantEditComponent,
    MerchantPageEditComponent,
    MerchantDetailsComponent,
    MerchantPageDetailsComponent,
    MerchantListComponent,
    MerchantListPageComponent,
  ],
  imports: [CommonModule, MerchantsRoutingModule],
})
export class MerchantsModule {}
