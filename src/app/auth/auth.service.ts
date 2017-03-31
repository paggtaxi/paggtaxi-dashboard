import { Injectable } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import "rxjs/add/operator/toPromise";
import { Http } from "@angular/http";
import { AppSettings } from "../app-settings";
import { User } from "../shared/models/user.model";

@Injectable()
export class AuthService {
  static TOKEN_NAME = 'id_token';

  constructor(private router: Router, private http: Http) {
  }

  login(username: string, password: string): Promise<any> {
    return this.http.post(`${AppSettings.API_ENDPOINT}${AppSettings.API_LOGIN}`, {
      username: username,
      password: password
    })
      .toPromise()
      .then((response) => {
        let responseJson = response.json();
        this.setToken(responseJson.token);
        this.setUser(responseJson.user);
        return responseJson;
      })
      .catch((error) => {
        return Promise.reject(error.message || error);
      })
  }

  updateCredentials() {
    this.http.post(`${AppSettings.API_ENDPOINT}${AppSettings.API_REFRESH_TOKEN}`, {
      token: this.getToken()
    })
      .toPromise()
      .then((response) => {
        let responseJson = response.json();
        this.setToken(responseJson.token);
        this.setUser(responseJson.user);
        return responseJson;
      })
      .catch((error) => {
        return Promise.reject(error.message || error);
      })
  }

  // This method will log the use out
  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('next_refresh');
    localStorage.removeItem(AuthService.TOKEN_NAME);
    // Send the user back to the public deals page after logout
    this.router.navigate(['/auth/login']);
  }

  // Finally, this method will check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
  loggedIn() {
    return tokenNotExpired();
  }

  getUser(): User {
    return <User> JSON.parse(localStorage.getItem('profile'));
  }

  setUser(user) {
    localStorage.setItem('profile', JSON.stringify(user));
  }

  setToken(token) {
    let nextRefresh: any = new Date();
    localStorage.setItem('next_refresh', nextRefresh.addMinutes(30));
    localStorage.setItem(AuthService.TOKEN_NAME, token);
  }

  getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_NAME);
  }

  getNextRefresh(): string {
    return localStorage.getItem('next_refresh');
  }

  mustUpdateToken() {
    let nextRefresh: any = this.getNextRefresh();
    if (nextRefresh) {
      nextRefresh = new Date(nextRefresh);
      return nextRefresh.toString() === 'Invalid Date' || (nextRefresh.getTime() <= new Date().getTime());
    }
    // not has next refresh key, must update
    return true;
  }

}