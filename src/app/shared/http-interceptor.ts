import { Injectable } from "@angular/core";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";

@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private router: Router,
              private toasterService: ToasterService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((error: Response) => {
      switch (error.status) {
        case 404:
          this.router.navigate(['/404']);
          break;
        case 500:
          this.toasterService.pop('error', 'Desculpe, ocorreu um erro no servidor! Tente novamente mais tarde.');
          break;
        case 401:
          this.toasterService.pop('error', 'Sua sessão expirou, faça login novamente.');
          this.router.navigate(['/auth']);
          break;
        case 403:
          this.toasterService.pop('error', 'Você não possui permissão para executar essa ação.');
          break;
      }
      return Observable.throw(error);
    });
  }

}