import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private tokenService: TokenStorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let loggedIn = this.tokenService.isLoggedIn();
    let user = this.tokenService.getUser();
    let url = this._router.url;
    console.log(url);
    console.log(url === '/login');
    if (loggedIn && url === '/profile') {
      return true;
    }
    if (!loggedIn && (url === '/login' || url === '/signup')) {
      return true;
    }
    if (loggedIn && url === '/admin') {
      if (user.roles.includes('admin')) {
        return true;
      }
      return false;
    }
    console.log('ok')
    return false;
  }
}
