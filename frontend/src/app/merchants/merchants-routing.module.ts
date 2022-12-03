import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantsComponent } from './merchants.component';

const routes: Routes = [{ path: '', component: MerchantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
