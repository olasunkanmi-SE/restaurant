import { Location } from '@angular/common';
import { Router, UrlSegment, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  IsAuthenticated = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private storage: StorageService,
    private location: Location,
    private auth: AuthService
  ) {
    this.IsAuthenticated = this.authservice.IsAuthenticated();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.IsAuthenticated) {
      return this.router.navigate(['/auth/login']);
    }
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.IsAuthenticated) {
      return this.router.navigate(['']);
    }
    return true;
  }
}
