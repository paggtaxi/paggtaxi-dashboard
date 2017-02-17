import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockRoutingModule } from "./stock-routing.module";
import { StockProductsComponent } from "./products.component";
import { ProductsService } from "./products.service";

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule
  ],
  declarations: [
    StockProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class StockModule {
}
