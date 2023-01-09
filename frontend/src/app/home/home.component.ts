import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  constructor(private readonly auth: AuthService) {
    this.isAuthenticated = this.auth.IsAuthenticated();
  }

  ngOnInit(): void {
    console.log(this.isAuthenticated);
  }
}
