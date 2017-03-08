import { NgModule } from '@angular/core';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth.rounting";
import { FormsModule }   from '@angular/forms';
import { LaddaModule } from "angular2-ladda";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    LaddaModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {
}