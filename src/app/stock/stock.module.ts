import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockRoutingModule } from "./stock-routing.module";
import { StockProductsComponent } from "./products.component";

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule
  ],
  declarations: [
    StockProductsComponent
  ]
})
export class StockModule {
}
