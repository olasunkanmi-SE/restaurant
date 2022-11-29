import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggingInterceptor } from './core/interceptors/logger.interceptor';
import { ErrorService } from './core/services/error.service';
import { SnackBarService } from './core/services/snack-bar-service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor, HeaderInterceptor } from './core/interceptors';
import { MatcomponentModule } from './modules/matcomponent/matcomponent.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatcomponentModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
  ],
  providers: [
    ErrorService,
    SnackBarService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
