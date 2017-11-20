import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  authenticationService;

  constructor(private router: Router, authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;


  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.checkLogin();
    // return true;
  }


  checkLogin(): boolean {
    if (this.authenticationService.isLoggedInStat) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
