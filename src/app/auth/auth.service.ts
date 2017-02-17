import { Injectable } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import "rxjs/add/operator/toPromise";
import { Http } from "@angular/http";

@Injectable()
export class AuthService {

  constructor(private router: Router, private http: Http) {
  }

  login(username: string, password: string): Promise<any> {
    return this.http.post('http://127.0.0.1:8000/api/api-token-auth/', {
      username: username,
      password: password
    })
      .toPromise()
      .then((response) => {
        console.log('AuthService.then');
        let responseJson = response.json();
        console.log(responseJson);
        localStorage.setItem('id_token', responseJson.token);
        localStorage.setItem('profile', responseJson.user);
        return responseJson;
      })
      .catch((error) => {
        console.log('AuthService.catch');
        return Promise.reject(error.message || error);
      })
  }

  // This method will log the use out
  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    console.log('logout');
    // Send the user back to the public deals page after logout
    this.router.navigate(['/auth/login']);
  }

  // Finally, this method will check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
  loggedIn() {
    return tokenNotExpired();
  }
}