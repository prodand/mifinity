import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin();
  }

  canLoad(route: Route): Promise<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    return this.loginService.isLoggedIn()
        .then(result => {
          if (result) return true;

          this.router.navigate(['/login']);
          return false;
        });
  }
}