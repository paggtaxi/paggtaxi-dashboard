import { Component } from "@angular/core";
import { BaseListView } from "../../shared/base-list-view";
import { ProductsService } from "../products.service";
import { Observable } from "rxjs";
import { IServerResponseList } from "../../shared/interfaces/server-response";
import { ProductEntry } from "../stock.models";

@Component({
  templateUrl: './list-product-entry.component.html'
})
export class ListProductEntryComponent extends BaseListView {

  items: ProductEntry[];

  constructor(private productsService: ProductsService) {
    super();
  }

  request(): Observable<IServerResponseList> {
    return this.productsService.getProductEntries(this.params);
  }
}

