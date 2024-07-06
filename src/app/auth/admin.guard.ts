import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { iUserRegistered } from '../Models/i-user-registered';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

type AccessData = {
  token: string,
  user: iUserRegistered
}


@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      const userJson = localStorage.getItem('accessData')
      const accessData:AccessData = JSON.parse(userJson!)
    return this.authSvc.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn && accessData.user.roles[0].roleType == "ADMIN") {
          return true;
        } else {
          this.router.navigate(['homepage']);
          return false;
        }
      })
    );;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute,state);
  }

}
