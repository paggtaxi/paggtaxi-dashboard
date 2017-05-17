import { Injectable } from "@angular/core";
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
// Import our authentication service
import { AuthService } from "./auth.service";
import { Logger } from "@nsalaun/ng-logger";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router, private logger: Logger) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.logger.debug("canActivate");
    if (this.auth.loggedIn()) {
      this.logger.debug("User is already logged...");
      if (this.auth.mustUpdateToken()) {
        this.logger.debug("mustUpdateToken", this.auth.mustUpdateToken());
        this.auth.updateCredentials();
      }
      return true;
    } else {
      this.logger.debug("User not is logged...");
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}