import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
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

  getProducts(): Promise<Product[]> {
    return this.authHttp.get(
      this.makeUrl('products')
    )
      .toPromise()
      .then((response) => {
        return response.json().results as Product[];
      })
      .catch((error) => {
        console.log(error);
      })
  }

}
