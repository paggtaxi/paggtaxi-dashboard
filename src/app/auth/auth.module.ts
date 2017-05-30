import { NgModule } from '@angular/core';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth.rounting";
import { FormsModule }   from '@angular/forms';
import { LaddaModule } from "angular2-ladda";
import { AuthHttpInterceptor } from "../shared/http-interceptor";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";

export function authHttpServiceFactory(http: Http, options: RequestOptions, router: Router,
                                       toasterService: ToasterService) {
  return new AuthHttpInterceptor(new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, router, toasterService, options);
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
      deps: [Http, RequestOptions, Router, ToasterService]
    }
  ]
})
export class AuthModule {
}