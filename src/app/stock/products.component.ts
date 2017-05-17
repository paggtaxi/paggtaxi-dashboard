import { Component } from "@angular/core";
import { ProductsService } from "./products.service";
import { Product } from "./stock.models";
import { IServerResponseList } from "../shared/interfaces/server-response";
import { BaseListView } from "../shared/base-list-view";
import { Observable } from "rxjs";

@Component({
  templateUrl: 'products.component.html'
})
export class StockProductsComponent extends BaseListView {

  items: Product[];

  constructor(private productsService: ProductsService) {
    super();
    this.disableDateFilter();
  }

  request(): Observable<IServerResponseList> {
    return this.productsService.getProducts(this.params);
  }

}
