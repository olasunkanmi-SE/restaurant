import { ErrorService } from './shared/services/error.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, tap, catchError } from 'rxjs';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MaterialComponentsModule } from './shared/module/material-components.module';
interface User {
  email: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HttpClientModule, MaterialComponentsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppComponent {
  sub = new BehaviorSubject<User>({} as User);
  title = 'frontend';
  backendUrl = 'http://localhost:3000/api/';

  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService
  ) {}

  getTextResponse() {
    return this.http.get(this.backendUrl, { responseType: 'text' }).pipe(
      catchError((error) => this.errorService.handleError(error)),
      tap({
        next: (data) => console.log(data),
      })
    );
  }

  onclick() {
    return this.getTextResponse().subscribe();
  }
}
