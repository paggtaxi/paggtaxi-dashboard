import { Component, OnInit } from '@angular/core';
import { ProductsService } from "./products.service";
import { Product } from "./stock.models";
import { AuthService } from "../auth/auth.service";

@Component({
  templateUrl: 'products.component.html'
})
export class StockProductsComponent implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().then(products => this.products = products);
  }

}
