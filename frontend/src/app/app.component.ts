import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
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
})
export class AppComponent {
  sub = new BehaviorSubject<User>({} as User);
  title = 'frontend';
  backendUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getTextResponse() {
    return this.http.get(this.backendUrl, { responseType: 'text' }).pipe(
      tap({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      })
    );
  }

  onclick() {
    return this.getTextResponse().subscribe();
  }
}
