import { Component } from "@angular/core";
import { ProductsService } from "./products.service";
import { Product } from "./stock.models";
import { IServerResponseList } from "../shared/interfaces/server-response";
import { BaseListView } from "../shared/base-list-view";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: 'products.component.html'
})
export class StockProductsComponent extends BaseListView<Product> {

  items: Product[];

  constructor(private productsService: ProductsService, protected route: ActivatedRoute) {
    super(route);
    this.disableDateFilter();
  }

  request(): Observable<IServerResponseList<Product>> {
    return this.productsService.getProducts(this.params);
  }

}
