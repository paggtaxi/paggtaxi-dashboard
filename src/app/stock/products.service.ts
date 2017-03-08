import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { AppSettings } from "../app-settings";
import { Product } from "./stock.models";

@Injectable()
export class ProductsService {

  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  makeUrl(path: string) {
    return `${AppSettings.API_ENDPOINT}${AppSettings.API_STOCK_PATH}${path}/`;
  }

  getProducts(params: Object): Promise<Product[]> {
    let _params = new URLSearchParams();
    for (let key of Object.keys(params)) {
      _params.set(key, params[key]);
    }
    return this.authHttp.get(
      this.makeUrl('products'),
      {search: _params}
    )
      .toPromise()
      .then((response) => {
        return response.json().results as Product[];
      })
      .catch(this.handlerError);
  }

  handlerError(error) {
    console.log(error);
  }

}
