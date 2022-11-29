import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatcomponentModule } from '../modules/matcomponent/matcomponent.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatcomponentModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
