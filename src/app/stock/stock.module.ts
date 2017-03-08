import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockRoutingModule } from "./stock-routing.module";
import { StockProductsComponent } from "./products.component";
import { ProductsService } from "./products.service";
import { BooleanImgPipe } from "../shared/pipe/boolean-img.pipe";
import { CurrencyFormatPipe } from "../shared/pipe/currency-format.pipe";

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule
  ],
  declarations: [
    StockProductsComponent,
    BooleanImgPipe,
    CurrencyFormatPipe
  ],
  providers: [
    ProductsService
  ]
})
export class StockModule {
}
