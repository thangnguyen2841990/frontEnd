import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currenUser = this.authenticationService.currentUser;
    if (currenUser == null) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      return false;
    }
    return true;
  }

}
