import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
