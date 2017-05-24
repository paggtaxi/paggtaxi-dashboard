import { Component, OnInit } from "@angular/core";
import { BaseListView } from "../../shared/base-list-view";
import { ProductsService } from "../products.service";
import { Observable } from "rxjs";
import { IServerResponseList } from "../../shared/interfaces/server-response";
import { ProductEntry } from "../stock.models";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  templateUrl: './list-product-entry.component.html'
})
export class ListProductEntryComponent extends BaseListView<ProductEntry> implements OnInit {

  items: ProductEntry[];

  constructor(private productsService: ProductsService, protected route: ActivatedRoute) {
    super(route);
    this.setQueryParams(['product']);
  }

  request(): Observable<IServerResponseList<ProductEntry>> {
    return this.productsService.getProductEntries(this.params);
  }
}

