import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { AppSettings } from "../app-settings";
import { IServerResponseList } from "../shared/interfaces/server-response";
import { BaseHttpService } from "../shared/http/base-http-service";
import { Observable } from "rxjs";

@Injectable()
export class CooperativeService extends BaseHttpService {

  constructor(private authHttp: AuthHttp) {
    super();
    this.setServicePath(AppSettings.API_COOP_PATH);
  }

  // PRODUCT
  getDrivers(params?: Object): Observable<IServerResponseList> {
    return this.authHttp.get(
      this.makeUrl('taxi-drivers'),
      {search: this.fetchQueryParams(params)}
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  handlerError(error): Observable<any> {
    return Observable.throw(error.json() || 'Server error without message');
  }

}
