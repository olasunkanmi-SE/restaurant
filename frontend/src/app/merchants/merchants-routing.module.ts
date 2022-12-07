import { MerchantListPageComponent } from './merchant-list/container/merchant-list-page/merchant-list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantPageDetailsComponent } from './merchant-details/container';
import { MerchantPageEditComponent } from './merchant-edit';
import { MerchantsComponent } from './merchants.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantsComponent,
    children: [
      { path: ':slug', component: MerchantPageDetailsComponent },
      { path: 'profile', component: MerchantPageEditComponent },
      { path: 'all', component: MerchantListPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantsRoutingModule {}
