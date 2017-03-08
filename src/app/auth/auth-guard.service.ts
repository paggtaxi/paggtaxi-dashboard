import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
// Import our authentication service
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (this.auth.loggedIn()) {
      if (this.auth.mustUpdateToken()) {
        this.auth.updateCredentials();
      }
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}