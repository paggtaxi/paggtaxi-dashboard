import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products.service";
import { Product } from "./stock.models";
import { AuthService } from "../auth/auth.service";

@Component({
  templateUrl: 'products.component.html'
})
export class StockProductsComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  __currentSort = {};

  getNewShortOrder(columnName: string) {
    let primaryOrder = 'desc';
    let secondaryOrder = 'asc';
    if (this.__currentSort.hasOwnProperty(columnName)) {
      let currentOrder: string = this.__currentSort[columnName];
      if (currentOrder) {
        return currentOrder == primaryOrder ? secondaryOrder : primaryOrder;
      }
    }
    return primaryOrder;
  }

  sortColumn(columnName: string) {
    this.__currentSort[columnName] = this.getNewShortOrder(columnName);
    this.getProducts();
  }

  sortColumnToParam() {
    let ordering = [];
    for (let data of Object.keys(this.__currentSort)) {
      let prefix = this.__currentSort[data] == 'desc' ? '-' : '';
      ordering.push(`${prefix}${data}`);
    }
    if (!ordering.length) {
      return '';
    }
    return {'ordering': ordering.join(',')};
  }

  getProducts() {
    this.productsService.getProducts(this.sortColumnToParam()).then(products => this.products = products);
  }

}
