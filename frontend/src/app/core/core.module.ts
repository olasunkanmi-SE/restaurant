import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatcomponentModule } from '../modules/matcomponent/matcomponent.module';
import { FooterComponent } from './footer/footer.component';
import { MiniFooterComponent } from './mini-footer/mini-footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MiniFooterComponent],
  imports: [CommonModule, MatcomponentModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MiniFooterComponent],
})
export class CoreModule {}
