import { URLSearchParams } from "@angular/http";
import { IHttpServices } from "../interfaces/http-services.interface";
import { AppSettings } from "../../app-settings";

export class BaseHttpService implements IHttpServices {

  private servicePath: string;

  makeUrl(...paths: Array<any>) {
    if (!this.getServicePath()) {
      throw 'Before call makeUrl you must set the service path with setServicePath() method.';
    }
    let path = paths.join('/');
    return `${AppSettings.API_ENDPOINT}${this.getServicePath()}${path}/`;
  }

  setServicePath(path: string): void {
    this.servicePath = path;
  }

  getServicePath(): string {
    return this.servicePath;
  }

  fetchQueryParams(params: Object): URLSearchParams {
    let _params = new URLSearchParams();
    if (params) {
      for (let key of Object.keys(params)) {
        _params.set(key, params[key]);
      }
    }
    return _params;
  }

  handlerError(error: any): void {
  }

}