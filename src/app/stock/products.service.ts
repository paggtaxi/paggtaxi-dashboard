import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { AppSettings } from "../app-settings";
import { IServerResponseIdName, IServerResponseList } from "../shared/interfaces/server-response";
import { BaseHttpService } from "../shared/http/base-http-service";
import { Observable } from "rxjs";
import { Product, ProductEntry } from "./stock.models";
import { Moment } from "moment";
import { Utils } from "../shared/utils";

export interface IDataCreateOutput {
  product: number;
  item_id: number;
  driver_id: number;
  date_output: Date | Moment;
}

@Injectable()
export class ProductsService extends BaseHttpService {

  constructor(private authHttp: AuthHttp) {
    super();
    this.setServicePath(AppSettings.API_STOCK_PATH);
  }

  // PRODUCT

  getProduct(id: number): Observable<Product> {
    return this.authHttp.get(
      this.makeUrl('products', id)
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  getProducts(params?: Object): Observable<IServerResponseList<Product>> {
    return this.authHttp.get(
      this.makeUrl('products'),
      {search: this.fetchQueryParams(params)}
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  getCategories(): Observable<Array<IServerResponseIdName>> {
    return this.authHttp.get(
      this.makeUrl('product-category')
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  create(product: Product): Observable<Product> {
    return this.authHttp.post(
      this.makeUrl('products'),
      product
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.authHttp.put(
      this.makeUrl('products', id),
      product
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  // PRODUCT ENTRIES

  getProductEntries(params?: Object): Observable<IServerResponseList<ProductEntry>> {
    return this.authHttp.get(
      this.makeUrl('products-entries'),
      {search: this.fetchQueryParams(params)}
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  createEntry(data: { product: number; items: { item_id: string, amount: number | string }[] }): Observable<Product> {
    return this.authHttp.post(
      this.makeUrl('products-entries'),
      {
        product_id: data.product,
        items: data.items,
      }
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  // PRODUCT OUTPUTS

  createOutput(data: IDataCreateOutput): Observable<Product> {
    return this.authHttp.post(
      this.makeUrl('products-outputs'),
      {
        product_id: data.product,
        item_id: data.item_id,
        driver_id: data.driver_id,
        date_output: Utils.formatDateBody(data.date_output)
      }
    )
      .map((response: Response) => response.json())
      .catch(this.handlerError);
  }

  handlerError(error): Observable<any> {
    return Observable.throw(error.json() || 'Server error without message');
  }

}
